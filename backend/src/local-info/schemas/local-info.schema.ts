import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Travel } from '../../travels/schemas/travel.schema';
import { ApiProperty } from '@nestjs/swagger';

export enum InfoType {
  METEO = 'meteo',
  TRANSPORT = 'transport',
  CULTURE = 'culture',
  SECURITE = 'securite',
  AUTRES = 'autres'
}

@Schema({ timestamps: true })
export class LocalInfo extends Document {
  @ApiProperty()
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Travel', required: true })
  voyage: Travel;

  @ApiProperty()
  @Prop({ required: true, enum: InfoType })
  type: InfoType;

  @ApiProperty()
  @Prop({ required: true })
  titre: string;

  @ApiProperty()
  @Prop({ required: true })
  description: string;

  @ApiProperty()
  @Prop()
  temperature?: number;

  @ApiProperty()
  @Prop()
  conditions?: string;

  @ApiProperty()
  @Prop()
  risqueSante?: string;

  @ApiProperty()
  @Prop()
  alerteSecurite?: string;

  @ApiProperty()
  @Prop()
  metadonneesExterne?: Record<string, any>;
}

export const LocalInfoSchema = SchemaFactory.createForClass(LocalInfo);