import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { Public } from '../../common/decorators/public.decorator';

@Public()
@Controller('scraping')
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Post('trigger')
  // @UseGuards(JwtAuthGuard) // Uncomment when Auth is ready
  async triggerScraping(
    @Body('targetName') targetName: string,
    @Body('portals') portals: string[],
    @Body('analysisId') analysisId: string,
  ) {
    return this.scrapingService.triggerScraping(targetName, portals, analysisId);
  }

  @Get('status/:jobId')
  // @UseGuards(JwtAuthGuard) // Uncomment when Auth is ready
  async getStatus(@Param('jobId') jobId: string) {
    return this.scrapingService.getScrapingStatus(jobId);
  }

  @Get('health')
  async healthCheck() {
    const isHealthy = await this.scrapingService.healthCheck();
    return { status: isHealthy ? 'healthy' : 'unhealthy' };
  }
}
