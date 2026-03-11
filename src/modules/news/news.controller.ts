import { Controller, Get, Param, UseGuards, Logger } from '@nestjs/common';
import { NewsService } from './news.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { ParseObjectIdPipe } from '@common/pipes/parse-objectid.pipe';

/**
 * Controller for news articles
 */
@Controller('news')
@UseGuards(JwtAuthGuard)
export class NewsController {
  private readonly logger = new Logger(NewsController.name);

  constructor(private readonly newsService: NewsService) {}

  @Get('analysis/:analysisId')
  findByAnalysis(@Param('analysisId', ParseObjectIdPipe) analysisId: string) {
    this.logger.log(`GET /news/analysis/${analysisId}`);
    return this.newsService.findByAnalysis(analysisId);
  }
}
