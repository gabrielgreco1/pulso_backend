import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { Analysis, AnalysisSchema } from './schemas/analysis.schema';

/**
 * Analysis module
 * Manages analysis requests and tracking
 */
import { AiModule } from '../ai/ai.module';
import { NewsModule } from '../news/news.module';
import { ScrapingModule } from '../scraping/scraping.module';
import { AnalysisReport, AnalysisReportSchema } from './schemas/analysis-report.schema';

import { ReportPdfService } from './report-pdf.service';

/**
 * Analysis module
 * Manages analysis requests and tracking
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Analysis.name, schema: AnalysisSchema },
      { name: AnalysisReport.name, schema: AnalysisReportSchema },
    ]),
    AiModule,
    NewsModule,
    ScrapingModule,
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService, ReportPdfService],
  exports: [AnalysisService],
})
export class AnalysisModule {}
