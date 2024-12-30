import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export enum RecommendationType {
  DESTINATION = 'destination',
  ACTIVITE = 'activite',
  HEBERGEMENT = 'hebergement',
  RESTAURANT = 'restaurant',
  TRANSPORT = 'transport'
}

@Schema({ timestamps: true })
export class Recommendation extends Document {
  @ApiProperty()
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'User', required: true })
  utilisateur: User;

  @ApiProperty()
  @Prop({ required: true, enum: RecommendationType })
  type: RecommendationType = RecommendationType.DESTINATION;

  @ApiProperty()
  @Prop({ required: true })
  titre: string = '';

  @ApiProperty()
  @Prop({ required: true })
  description: string = '';

  @ApiProperty()
  @Prop()
  localisation?: string;

  @ApiProperty()
  @Prop()
  score?: number;

  @ApiProperty()
  @Prop()
  metadonneesExterne?: Record<string, any>;
}

export const RecommendationSchema = SchemaFactory.createForClass(Recommendation);