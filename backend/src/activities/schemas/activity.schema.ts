import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Travel } from '../../travels/schemas/travel.schema';
import { ApiProperty } from '@nestjs/swagger';

export enum ActivityType {
  CULTURE = 'culture',
  NATURE = 'nature',
  SPORT = 'sport',
  GASTRONOMIE = 'gastronomie',
  DETENTE = 'detente',
  AUTRES = 'autres'
}

@Schema({ timestamps: true })
export class Activity extends Document {
  @ApiProperty()
  @Prop({ required: true })
  nom: string = '';

  @ApiProperty()
  @Prop({ required: true })
  description: string = '';

  @ApiProperty()
  @Prop({ enum: ActivityType, default: ActivityType.AUTRES })
  type: ActivityType = ActivityType.AUTRES;

  @ApiProperty()
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Travel', required: true })
  voyage: Travel;

  @ApiProperty()
  @Prop()
  lieu?: string;

  @ApiProperty()
  @Prop()
  dateActivite?: Date;

  @ApiProperty()
  @Prop()
  duree?: number;

  @ApiProperty()
  @Prop()
  cout?: number;

  @ApiProperty()
  @Prop()
  note?: number;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);