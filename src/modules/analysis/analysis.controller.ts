import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AnalysisService } from './analysis.service';
import { ReportPdfService } from './report-pdf.service';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { ParseObjectIdPipe } from '@common/pipes/parse-objectid.pipe';

/**
 * Controller for analysis management
 * Handles analysis CRUD operations
 */
@Controller('analysis')
@UseGuards(JwtAuthGuard)
export class AnalysisController {
  private readonly logger = new Logger(AnalysisController.name);

  constructor(
    private readonly analysisService: AnalysisService,
    private readonly reportPdfService: ReportPdfService,
  ) { }

  @Get(':id/download')
  async download(@Param('id', ParseObjectIdPipe) id: string, @Res() res: Response) {
    this.logger.log(`GET /analysis/${id}/download`);
    const analysis = await this.analysisService.findById(id);
    const report = await this.analysisService.getReport(id);
    const articles = await this.analysisService.getArticles(id);

    if (!report) {
      return res.status(404).json({ message: 'Relatório não encontrado' });
    }

    try {
      const pdfStream = await this.reportPdfService.generateReport(analysis, report, articles);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename=Relatorio-Pulso-${analysis.targetName}.pdf`,
      );

      pdfStream.pipe(res);
    } catch (error: any) {
      this.logger.error(`Error generating PDF for analysis ${id}: ${error.message}`);
      return res.status(500).json({ message: 'Erro ao gerar PDF' });
    }
  }

  @Post()
  create(@CurrentUser() user: any, @Body() createAnalysisDto: CreateAnalysisDto) {
    this.logger.log(`POST /analysis - Creating analysis for user ${user.id}`);
    return this.analysisService.create(user.id, user.plan, createAnalysisDto);
  }

  @Post(':id/start')
  startAnalysis(@Param('id', ParseObjectIdPipe) id: string) {
    this.logger.log(`POST /analysis/${id}/start`);
    // Run in background (don't await)
    this.analysisService.startAnalysis(id).catch((err) => {
      this.logger.error(`Error starting analysis ${id}: ${err.message}`);
    });
    return { message: 'Analysis started' };
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    this.logger.log(`GET /analysis - Fetching analyses for user ${user.id}`);
    return this.analysisService.findByUser(user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    this.logger.log(`GET /analysis/${id}`);
    return this.analysisService.findById(id);
  }

  @Get(':id/report')
  getReport(@Param('id', ParseObjectIdPipe) id: string) {
    this.logger.log(`GET /analysis/${id}/report`);
    return this.analysisService.getReport(id);
  }

  @Get(':id/articles')
  getArticles(@Param('id', ParseObjectIdPipe) id: string) {
    this.logger.log(`GET /analysis/${id}/articles`);
    return this.analysisService.getArticles(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateAnalysisDto: UpdateAnalysisDto) {
    this.logger.log(`PATCH /analysis/${id}`);
    return this.analysisService.update(id, updateAnalysisDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    this.logger.log(`DELETE /analysis/${id}`);
    return this.analysisService.remove(id);
  }
}
