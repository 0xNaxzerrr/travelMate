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

@Schema()
export class ItineraryStep {
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
  @Prop({ 
    type: {
      latitude: { type: Number },
      longitude: { type: Number }
    }
  })
  coordonnees: { latitude: number; longitude: number };
}

const ItineraryStepSchema = SchemaFactory.createForClass(ItineraryStep);
export { ItineraryStepSchema };

@Schema({ timestamps: true })
export class Itinerary extends Document {
  @ApiProperty()
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Travel', required: true })
  voyage: Travel;

  @ApiProperty()
  @Prop({ type: [ItineraryStepSchema] })
  etapes: ItineraryStep[];

  @ApiProperty()
  @Prop()
  notePersonnelle?: string;
}

export const ItinerarySchema = SchemaFactory.createForClass(Itinerary);