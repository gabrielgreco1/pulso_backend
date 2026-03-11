import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

/**
 * User schema for MongoDB
 * Represents a user in the Pulso platform
 */
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({
    required: true,
    enum: ['essential', 'professional', 'strategic'],
    default: 'essential',
  })
  plan: string;

  @Prop({ default: null })
  stripeCustomerId: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Create indexes
UserSchema.index({ stripeCustomerId: 1 });
