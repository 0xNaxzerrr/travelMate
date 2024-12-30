import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Travel } from '../../travels/schemas/travel.schema';
import { ApiProperty } from '@nestjs/swagger';

export enum TransportMode {
  PLANE = 'plane',
  TRAIN = 'train',
  BUS = 'bus',
  CAR = 'car',
  WALKING = 'walking'
}

@Schema({ timestamps: true })
export class ItineraryStep extends Document {
  @ApiProperty()
  @Prop({ required: true })
  lieu: string;

  @ApiProperty()
  @Prop({ required: true })
  dateDebut: Date;

  @ApiProperty()
  @Prop({ required: true })
  dateFin: Date;

  @ApiProperty()
  @Prop({ enum: TransportMode })
  transport?: TransportMode;

  @ApiProperty()
  @Prop()
  description?: string;

  @ApiProperty()
  @Prop()
  coordonnees?: {
    latitude: number;
    longitude: number;
  };
}

@Schema({ timestamps: true })
export class Itinerary extends Document {
  @ApiProperty()
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Travel', required: true })
  voyage: Travel;

  @ApiProperty()
  @Prop({ type: [ItineraryStep], default: [] })
  etapes: ItineraryStep[];

  @ApiProperty()
  @Prop()
  notePersonnelle?: string;
}

export const ItinerarySchema = SchemaFactory.createForClass(Itinerary);
export const ItineraryStepSchema = SchemaFactory.createForClass(ItineraryStep);