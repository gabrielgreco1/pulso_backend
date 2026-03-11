import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service for orchestrating Python scraping service
 * Communicates with the Python FastAPI scraping container
 */
@Injectable()
export class ScrapingService {
  private readonly logger = new Logger(ScrapingService.name);
  private readonly scrapingApiUrl: string;

  constructor(private configService: ConfigService) {
    this.scrapingApiUrl = this.configService.get<string>('app.scrapingApiUrl')!;
    this.logger.log(`Scraping API URL: ${this.scrapingApiUrl}`);
  }

  /**
   * Trigger scraping for a specific target
   */
  async triggerScraping(
    targetName: string,
    portals: string[],
    analysisId: string,
    instagramProfile?: string,
  ): Promise<{ jobId: string; status: string; message: string }> {
    this.logger.log(`Triggering scraping for: ${targetName} on portals: ${portals.join(', ')}`);

    try {
      const response = await fetch(`${this.scrapingApiUrl}/scrape`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target_name: targetName,
          portals: portals,
          analysis_id: analysisId,
          instagram_profile: instagramProfile,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new HttpException(error.detail || 'Scraping service error', response.status);
      }

      const data = await response.json();
      this.logger.log(`Scraping job created: ${data.job_id}`);

      return {
        jobId: data.job_id,
        status: data.status,
        message: data.message,
      };
    } catch (error: any) {
      this.logger.error(`Error triggering scraping: ${error.message}`);
      throw new HttpException(
        'Failed to trigger scraping service',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Check scraping status
   */
  async getScrapingStatus(jobId: string): Promise<any> {
    this.logger.log(`Checking scraping status for job: ${jobId}`);

    try {
      const response = await fetch(`${this.scrapingApiUrl}/status/${jobId}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
        }
        throw new HttpException('Scraping service error', response.status);
      }

      const data = await response.json();
      this.logger.log(`Job ${jobId} status: ${data.status}`);

      return data;
    } catch (error: any) {
      this.logger.error(`Error checking scraping status: ${error.message}`);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('Failed to check scraping status', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Check if scraping service is healthy
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.scrapingApiUrl}/health`);
      return response.ok;
    } catch (error) {
      this.logger.error('Scraping service health check failed');
      return false;
    }
  }
}
