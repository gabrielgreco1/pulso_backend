import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AnalysisDocument = Analysis & Document;

/**
 * Analysis schema for MongoDB
 * Represents an analysis request for a public figure
 */
@Schema({ timestamps: true })
export class Analysis {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  targetName: string;

  @Prop({
    required: true,
    enum: ['politician', 'influencer', 'celebrity'],
    default: 'politician',
  })
  targetType: string;

  @Prop({
    required: true,
    enum: ['pending', 'scraping', 'analyzing', 'done', 'error'],
    default: 'pending',
  })
  status: string;

  @Prop({
    required: true,
    enum: ['essential', 'professional', 'strategic'],
  })
  plan: string;

  @Prop({ type: [String], default: [] })
  portals: string[];

  @Prop({ type: Number, default: 0, min: 0, max: 100 })
  progress: number;

  @Prop({ type: String })
  errorMessage?: string;

  @Prop({ type: String })
  instagramProfile?: string;
}

export const AnalysisSchema = SchemaFactory.createForClass(Analysis);

// Create indexes
AnalysisSchema.index({ userId: 1, createdAt: -1 });
AnalysisSchema.index({ status: 1 });
