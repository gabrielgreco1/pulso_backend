import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as handlebars from 'handlebars';
import { marked } from 'marked';
import axios from 'axios';
import * as FormData from 'form-data';
import { Analysis } from './schemas/analysis.schema';
import { AnalysisReport } from './schemas/analysis-report.schema';

@Injectable()
export class ReportPdfService {
  private readonly logger = new Logger(ReportPdfService.name);
  private readonly gotenbergUrl: string;

  constructor(private configService: ConfigService) {
    this.gotenbergUrl = this.configService.get<string>('GOTENBERG_URL') || 'http://localhost:3003';

    // Register Handlebars helpers
    this.registerHelpers();
  }

  private registerHelpers() {
    handlebars.registerHelper('scoreColor', (value: number) => {
      if (value >= 70) return 'score-emerald';
      if (value >= 50) return 'score-sky';
      if (value >= 30) return 'score-amber';
      return 'score-rose';
    });

    handlebars.registerHelper('barColor', (value: number) => {
      if (value >= 70) return 'bg-emerald-500';
      if (value >= 50) return 'bg-sky-500';
      if (value >= 30) return 'bg-amber-500';
      return 'bg-rose-500';
    });

    handlebars.registerHelper('sentimentColor', (sentiment: number) => {
      if (sentiment > 0.3) return 'text-emerald-500';
      if (sentiment < -0.3) return 'text-rose-500';
      return 'text-slate-400';
    });

    handlebars.registerHelper('sentimentPct', (sentiment: number) => {
      const val = Math.round((sentiment || 0) * 100);
      return `${val > 0 ? '+' : ''}${val}%`;
    });

    handlebars.registerHelper('formatDate', (dateStr: string) => {
      if (!dateStr) return '';
      return new Date(dateStr).toLocaleDateString('pt-BR');
    });

    handlebars.registerHelper('markdown', (text: string) => {
      if (!text) return '';
      return new handlebars.SafeString(marked.parse(text) as string);
    });
  }

  async generateReport(analysis: Analysis, report: AnalysisReport, articles: any[]): Promise<any> {
    this.logger.log(`Generating High-Fidelity PDF via Gotenberg for analysis: ${(analysis as any)._id}`);

    try {
      // 1. Prepare Data
      const data = {
        analysis,
        report: this.prepareReportData(report),
        articles: articles.slice(0, 15), // Limit articles for the snapshot
        today: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
      };

      // 2. Load and Compile Template
      const templatePath = path.join(__dirname, 'templates', 'report.hbs');
      let templateSource: string;

      try {
        templateSource = await fs.readFile(templatePath, 'utf-8');
      } catch (err) {
        // Fallback for development if __dirname points to dist
        const fallbackPath = path.join(process.cwd(), 'src/modules/analysis/templates/report.hbs');
        templateSource = await fs.readFile(fallbackPath, 'utf-8');
      }

      const template = handlebars.compile(templateSource);
      const html = template(data);

      this.logger.debug(`HTML template compiled. Size: ${html.length} chars`);

      // 3. Call Gotenberg
      this.logger.log(`Calling Gotenberg at: ${this.gotenbergUrl}`);
      const form = new FormData();
      form.append('index.html', html);
      form.append('waitDelay', '2s');

      const response = await axios.post(`${this.gotenbergUrl}/forms/chromium/convert/html`, form, {
        headers: form.getHeaders(),
        responseType: 'stream',
        timeout: 30000
      });

      return response.data;
    } catch (error: any) {
      const errorMsg = error.response ?
        `Gotenberg failed with status ${error.response.status}: ${JSON.stringify(error.response.data || 'No data')}` :
        `Gotenberg request failed: ${error.message} (Code: ${error.code})`;

      this.logger.error(`Failed to generate PDF via Gotenberg: ${errorMsg}`);

      if (error.code === 'ECONNREFUSED' || error.message?.includes('ECONNREFUSED')) {
        this.logger.error(`CRITICAL: Backend cannot reach Gotenberg at ${this.gotenbergUrl}.`);
        this.logger.error('Please verify if the Docker container is running: docker ps | grep gotenberg');
        this.logger.error('Or try starting it: docker-compose up -d gotenberg');
      }

      throw error;
    }
  }

  private prepareReportData(report: any) {
    // Ensure score objects are consistent for the template
    const ensureScore = (score: any) => {
      if (typeof score === 'number') {
        return { value: score, label: this.getScoreLabel(score), explanation: '' };
      }
      return {
        ...score,
        label: score.label || this.getScoreLabel(score.value)
      };
    };

    return {
      ...report,
      overallScore: ensureScore(report.overallScore),
      acceptanceScore: ensureScore(report.acceptanceScore),
      temperatureScore: ensureScore(report.temperatureScore)
    };
  }

  private getScoreLabel(value: number): string {
    if (value >= 85) return 'Excepcional';
    if (value >= 70) return 'Forte';
    if (value >= 50) return 'Estável';
    if (value >= 30) return 'Frágil';
    return 'Crítico';
  }
}
