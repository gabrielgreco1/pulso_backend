import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NewsArticleDocument = NewsArticle & Document;

/**
 * News Article schema
 * Stores scraped news articles with AI analysis
 */
@Schema({ timestamps: true })
export class NewsArticle {
  @Prop({ type: Types.ObjectId, ref: 'Analysis', required: true })
  analysisId: Types.ObjectId;

  @Prop({ required: true })
  portal: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  url: string;

  @Prop({ type: Date, required: true })
  publishedAt: Date;

  @Prop({ type: Date, default: Date.now })
  scrapedAt: Date;

  @Prop({ type: String })
  content: string;

  @Prop({
    type: {
      sentiment: String,
      score: Number,
      themes: [String],
      bias: String,
      relevance: String,
      summary: String,
    },
  })
  aiAnalysis?: {
    sentiment: string;
    score: number;
    themes: string[];
    bias: string;
    relevance: string;
    summary: string;
  };
}

export const NewsArticleSchema = SchemaFactory.createForClass(NewsArticle);

NewsArticleSchema.index({ analysisId: 1, publishedAt: -1 });
NewsArticleSchema.index({ portal: 1 });
