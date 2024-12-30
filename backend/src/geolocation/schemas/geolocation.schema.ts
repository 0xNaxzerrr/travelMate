import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Geolocation extends Document {
  @ApiProperty()
  @Prop({ required: true })
  latitude: number;

  @ApiProperty()
  @Prop({ required: true })
  longitude: number;

  @ApiProperty()
  @Prop()
  adresse?: string;

  @ApiProperty()
  @Prop()
  ville?: string;

  @ApiProperty()
  @Prop()
  pays?: string;

  @ApiProperty()
  @Prop()
  codePostal?: string;

  @ApiProperty()
  @Prop()
  description?: string;
}

export const GeolocationSchema = SchemaFactory.createForClass(Geolocation);