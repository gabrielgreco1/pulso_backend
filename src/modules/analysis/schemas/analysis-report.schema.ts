import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AnalysisReportDocument = AnalysisReport & Document;

/**
 * Analysis Report Schema
 * Stores the consolidated AI analysis results with detailed score breakdowns
 */
@Schema({ timestamps: true, strict: false })
export class AnalysisReport {
  @Prop({ type: Types.ObjectId, ref: 'Analysis', required: true, unique: true })
  analysisId: Types.ObjectId;

  // Scores are now objects with value, label, explanation, and criteria breakdown
  @Prop({ type: Object, required: true })
  overallScore: any;

  @Prop({ type: Object, required: true })
  acceptanceScore: any;

  @Prop({ type: Object, required: true })
  temperatureScore: any;

  @Prop({ type: [Object] })
  scoresByPortal: any[];

  @Prop({ type: Object })
  biasMap: { left: number; center: number; right: number };

  // Strengths/weaknesses/recommendations are now rich objects
  @Prop({ type: [Object] })
  strengths: any[];

  @Prop({ type: [Object] })
  weaknesses: any[];

  @Prop({ type: [Object] })
  recommendations: any[];

  @Prop({ type: [Object] })
  keyThemes: any[];

  @Prop({ type: Object })
  sentimentDistribution: { positive: number; neutral: number; negative: number };

  @Prop({ type: [{ date: String, score: Number }] })
  trend: { date: string; score: number }[];

  @Prop({ type: String })
  executiveSummary: string;

  @Prop({ type: String })
  methodology: string;

  @Prop({ type: Date, default: Date.now })
  generatedAt: Date;
}

export const AnalysisReportSchema = SchemaFactory.createForClass(AnalysisReport);
