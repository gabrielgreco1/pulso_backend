import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { SINGLE_NEWS_PROMPT, SINGLE_SOCIAL_PROMPT, CONSOLIDATION_PROMPT } from './prompts';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openai: OpenAI;
  private model: string;
  private initialized = false;

  constructor(private configService: ConfigService) {}

  private initializeOpenAI() {
    if (this.initialized) return;
    
    const apiKey = this.configService.get<string>('openai.apiKey');
    if (!apiKey) {
      this.logger.warn('OPENAI_API_KEY not configured. AI features will be disabled.');
      return;
    }
    
    this.openai = new OpenAI({ apiKey });
    this.model = this.configService.get<string>('openai.model') || 'gpt-4o';
    this.initialized = true;
  }

  /**
   * Analyze a single news article or social media post
   */
  async analyzeSingle(article: any, targetName: string): Promise<any> {
    this.initializeOpenAI();
    
    if (!this.openai) {
      this.logger.warn('OpenAI not configured. Skipping analysis.');
      return null;
    }

    this.logger.log(
      `Analyzing ${article.portal === 'instagram' ? 'social post' : 'article'}: ${article.title || 'no-title'}`,
    );

    try {
      const isSocial = article.portal === 'instagram';
      const basePrompt = isSocial ? SINGLE_SOCIAL_PROMPT : SINGLE_NEWS_PROMPT;

      const prompt = basePrompt
        .replace('{targetName}', targetName)
        .replace('{title}', article.title || '')
        .replace('{portal}', article.portal || '')
        .replace('{date}', article.publishedAt ? new Date(article.publishedAt).toISOString() : '')
        .replace('{content}', (article.content || '').substring(0, 15000)); // Limit content length

      const completion = await this.openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a helpful assistant that outputs JSON.' },
          { role: 'user', content: prompt },
        ],
        model: this.model,
        response_format: { type: 'json_object' },
        temperature: 0.3,
      });

      const content = completion.choices[0].message.content;
      if (!content) return null;

      const analysis = JSON.parse(content);
      return {
        ...analysis,
        analyzedAt: new Date(),
        model: this.model,
      };
    } catch (error: any) {
      this.logger.error(`Error analyzing ${article.portal}: ${error.message}`);
      return null; // Don't throw, just skip
    }
  }

  /**
   * Consolidate analyses into a report
   */
  async consolidate(analysisId: string, targetName: string, analyzedArticles: any[]): Promise<any> {
    this.initializeOpenAI();
    
    if (!this.openai) {
      this.logger.warn('OpenAI not configured. Skipping consolidation.');
      return null;
    }

    this.logger.log(`Consolidating report for analysis: ${analysisId}`);

    if (!analyzedArticles || analyzedArticles.length === 0) {
      this.logger.warn('No articles to consolidate');
      return null;
    }

    try {
      // Split into news and social
      const newsArticles = analyzedArticles.filter((a) => a.portal !== 'instagram');
      const socialPosts = analyzedArticles.filter((a) => a.portal === 'instagram');

      const newsSummary = newsArticles.map((article) => ({
        title: article.title,
        portal: article.portal,
        date: article.publishedAt,
        sentiment: article.aiAnalysis?.sentiment,
        bias: article.aiAnalysis?.bias,
        summary: article.aiAnalysis?.summary,
      }));

      const socialSummary = socialPosts.map((post) => ({
        portal: post.portal,
        date: post.publishedAt,
        sentiment: post.aiAnalysis?.sentiment,
        temperature: post.aiAnalysis?.temperature,
        summary: post.aiAnalysis?.summary,
        content: (post.content || '').substring(0, 100), // snippet
      }));

      const prompt = CONSOLIDATION_PROMPT.replace('{targetName}', targetName)
        .replace('{newsData}', JSON.stringify(newsSummary, null, 2))
        .replace('{socialData}', JSON.stringify(socialSummary, null, 2));

      const completion = await this.openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a helpful assistant that outputs JSON.' },
          { role: 'user', content: prompt },
        ],
        model: this.model,
        response_format: { type: 'json_object' },
        temperature: 0.4,
      });

      const content = completion.choices[0].message.content;
      if (!content) return null;

      const report = JSON.parse(content);
      return {
        ...report,
        analysisId,
        generatedAt: new Date(),
        articleCount: newsArticles.length,
        socialCount: socialPosts.length,
        model: this.model,
      };
    } catch (error: any) {
      this.logger.error(`Error consolidating report: ${error.message}`);
      throw error;
    }
  }
}
