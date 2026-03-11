import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NewsArticle, NewsArticleDocument } from './schemas/news-article.schema';

/**
 * Service for managing news articles
 */
@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);

  constructor(
    @InjectModel(NewsArticle.name) private newsArticleModel: Model<NewsArticleDocument>,
  ) {}

  /**
   * Find all articles for an analysis
   */
  async findByAnalysis(analysisId: string): Promise<NewsArticleDocument[]> {
    this.logger.log(`Fetching articles for analysis: ${analysisId}`);
    return this.newsArticleModel
      .find({ analysisId: new Types.ObjectId(analysisId) })
      .sort({ publishedAt: -1 })
      .exec();
  }

  /**
   * Create a new article
   */
  async create(articleData: Partial<NewsArticle>): Promise<NewsArticle> {
    this.logger.log(`Creating article: ${articleData.title}`);
    const article = new this.newsArticleModel(articleData);
    return article.save();
  }

  /**
   * Update an article
   */
  async update(id: string, updateData: Partial<NewsArticle>): Promise<NewsArticle> {
    const article = await this.newsArticleModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!article) {
      throw new Error(`Article with ID ${id} not found`);
    }
    return article;
  }
}
