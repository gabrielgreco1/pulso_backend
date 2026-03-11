import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Analysis, AnalysisDocument } from './schemas/analysis.schema';
import { AnalysisReport, AnalysisReportDocument } from './schemas/analysis-report.schema';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';
import { NewsService } from '../news/news.service';
import { AiService } from '../ai/ai.service';
import { ScrapingService } from '../scraping/scraping.service';

/**
 * Service for managing analysis requests
 * Handles CRUD operations and status tracking
 */
@Injectable()
export class AnalysisService {
  private readonly logger = new Logger(AnalysisService.name);

  constructor(
    @InjectModel(Analysis.name) private analysisModel: Model<AnalysisDocument>,
    @InjectModel(AnalysisReport.name) private analysisReportModel: Model<AnalysisReportDocument>,
    private readonly newsService: NewsService,
    private readonly aiService: AiService,
    private readonly scrapingService: ScrapingService,
  ) {}

  /**
   * Create a new analysis request
   */
  async create(
    userId: string,
    userPlan: string,
    createAnalysisDto: CreateAnalysisDto,
  ): Promise<Analysis> {
    this.logger.log(`Creating analysis for user ${userId}: ${createAnalysisDto.targetName}`);

    const analysis = new this.analysisModel({
      userId: new Types.ObjectId(userId),
      ...createAnalysisDto,
      plan: userPlan,
      status: 'pending',
      progress: 0,
    });

    const savedAnalysis = await analysis.save();
    this.logger.log(`Analysis created: ${savedAnalysis._id}`);
    return savedAnalysis;
  }

  /**
   * Find all analyses for a user
   */
  async findByUser(userId: string): Promise<Analysis[]> {
    this.logger.log(`Fetching analyses for user: ${userId}`);
    return this.analysisModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  /**
   * Find analysis by ID
   */
  async findById(id: string): Promise<Analysis> {
    this.logger.log(`Fetching analysis: ${id}`);
    const analysis = await this.analysisModel.findById(id).exec();

    if (!analysis) {
      throw new NotFoundException(`Analysis with ID ${id} not found`);
    }

    return analysis;
  }

  /**
   * Update analysis status and progress
   */
  async update(id: string, updateAnalysisDto: UpdateAnalysisDto): Promise<Analysis> {
    this.logger.log(`Updating analysis ${id}: ${JSON.stringify(updateAnalysisDto)}`);

    const analysis = await this.analysisModel
      .findByIdAndUpdate(id, updateAnalysisDto, { new: true })
      .exec();

    if (!analysis) {
      throw new NotFoundException(`Analysis with ID ${id} not found`);
    }

    this.logger.log(`Analysis updated: ${id}`);
    return analysis;
  }

  /**
   * Delete analysis
   */
  async remove(id: string): Promise<void> {
    this.logger.log(`Deleting analysis: ${id}`);

    const result = await this.analysisModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Analysis with ID ${id} not found`);
    }

    this.logger.log(`Analysis deleted: ${id}`);
  }

  /**
   * Helper to wait for a specified number of milliseconds
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Start the full analysis pipeline:
   *   1. Trigger scraping (Python API)
   *   2. Poll until scraping is done
   *   3. Run AI analysis on collected articles
   *   4. Consolidate into a report
   */
  async startAnalysis(id: string): Promise<void> {
    this.logger.log(`Starting full analysis pipeline for ${id}`);

    const analysis = await this.findById(id);

    try {
      // ── Step 1: Trigger Scraping ──────────────────────
      await this.update(id, { status: 'scraping', progress: 5 });

      const portals = analysis.portals || ['g1', 'folha'];
      let scrapingResult: { jobId: string; status: string; message: string };

      try {
        scrapingResult = await this.scrapingService.triggerScraping(
          analysis.targetName,
          portals,
          id,
          analysis.instagramProfile,
        );
        this.logger.log(`Scraping triggered, job: ${scrapingResult.jobId}`);
      } catch (scrapingError: any) {
        this.logger.warn(
          `Scraping service unavailable: ${scrapingError.message}. Proceeding with existing articles.`,
        );
        // Continue to analysis with whatever articles exist
        scrapingResult = { jobId: '', status: 'done', message: 'skipped' };
      }

      // ── Step 2: Poll Scraping Status ──────────────────
      if (scrapingResult.jobId) {
        await this.update(id, { progress: 10 });
        const maxAttempts = 60; // 5 minutes max (60 * 5s)
        let attempt = 0;

        while (attempt < maxAttempts) {
          await this.delay(5000); // Wait 5 seconds between polls
          attempt++;

          try {
            const status = await this.scrapingService.getScrapingStatus(scrapingResult.jobId);
            this.logger.log(`Scraping poll #${attempt}: ${status.status}`);

            // Update progress (10% to 40%)
            const scrapingProgress = 10 + Math.floor((attempt / maxAttempts) * 30);
            await this.update(id, { progress: Math.min(scrapingProgress, 40) });

            if (status.status === 'done' || status.status === 'completed') {
              this.logger.log(`Scraping completed for job ${scrapingResult.jobId}`);
              break;
            }

            if (status.status === 'error' || status.status === 'failed') {
              this.logger.warn(
                `Scraping failed for job ${scrapingResult.jobId}. Proceeding with available articles.`,
              );
              break;
            }
          } catch (pollError: any) {
            this.logger.warn(`Error polling scraping status: ${pollError.message}`);
            // Continue polling
          }
        }

        if (attempt >= maxAttempts) {
          this.logger.warn(
            `Scraping timed out for job ${scrapingResult.jobId}. Proceeding with available articles.`,
          );
        }
      }

      // ── Step 3: AI Analysis ───────────────────────────
      await this.update(id, { status: 'analyzing', progress: 45 });

      const articles = await this.newsService.findByAnalysis(id);

      if (!articles || articles.length === 0) {
        this.logger.warn(`No articles found for analysis ${id}`);
        await this.update(id, {
          status: 'done',
          progress: 100,
          errorMessage: 'No articles found after scraping. Try broader search terms.',
        });
        return;
      }

      this.logger.log(`Found ${articles.length} articles for analysis ${id}`);

      // Analyze individual articles
      const totalArticles = articles.length;
      let analyzedCount = 0;

      for (const article of articles) {
        if (article.aiAnalysis) {
          analyzedCount++;
          continue;
        }

        const analysisResult = await this.aiService.analyzeSingle(article, analysis.targetName);

        if (analysisResult) {
          await this.newsService.update(article._id.toString(), {
            aiAnalysis: analysisResult,
          });
          analyzedCount++;
        }

        // Update progress (45% to 85%)
        const progress = 45 + Math.floor((analyzedCount / totalArticles) * 40);
        if (analyzedCount % 3 === 0) {
          await this.update(id, { progress });
        }
      }

      // ── Step 4: Consolidate Report ────────────────────
      await this.update(id, { progress: 90 });

      const analyzedArticles = await this.newsService.findByAnalysis(id);
      const validArticles = analyzedArticles.filter((a) => a.aiAnalysis);

      if (validArticles.length > 0) {
        const report = await this.aiService.consolidate(id, analysis.targetName, validArticles);

        if (report) {
          // Destructure analysisId from AI result to prevent string overwriting ObjectId
          const { analysisId: _aiAnalysisId, ...reportData } = report;
          const analysisReport = new this.analysisReportModel({
            analysisId: new Types.ObjectId(id),
            ...reportData,
          });
          await analysisReport.save();
          this.logger.log(`Report saved for analysis ${id}`);
        }
      }

      // ── Step 5: Done ──────────────────────────────────
      await this.update(id, { status: 'done', progress: 100 });
      this.logger.log(`Analysis ${id} completed successfully`);
    } catch (error: any) {
      this.logger.error(`Error in analysis pipeline for ${id}: ${error.message}`);
      await this.update(id, {
        status: 'error',
        errorMessage: error.message,
      });
    }
  }

  /**
   * Get analysis report
   */
  async getReport(analysisId: string): Promise<AnalysisReport | null> {
    // Try ObjectId first, then string fallback for legacy records
    let report = await this.analysisReportModel
      .findOne({ analysisId: new Types.ObjectId(analysisId) })
      .exec();
    if (!report) {
      report = await this.analysisReportModel.findOne({ analysisId: analysisId as any }).exec();
    }
    return report;
  }

  /**
   * Get analysis articles
   */
  async getArticles(analysisId: string): Promise<any[]> {
    return this.newsService.findByAnalysis(analysisId);
  }
}
