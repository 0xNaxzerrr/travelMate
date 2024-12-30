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
  @Prop({
    type: {
      source: { type: String },
      dateCreation: { type: Date },
      score: { type: Number },
      // ajoutez d'autres champs selon vos besoins
    }
  })
  metadonneesExterne: {
    source: string;
    dateCreation: Date;
    score: number;
    // ... autres champs nécessaires
  };
}

export const RecommendationSchema = SchemaFactory.createForClass(Recommendation);