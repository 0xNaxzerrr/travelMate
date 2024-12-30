import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export enum TravelStatus {
  PLANNED = 'planned',
  ONGOING = 'ongoing',
  COMPLETED = 'completed'
}

@Schema({ timestamps: true })
export class Travel extends Document {
  @ApiProperty()
  @Prop({ required: true })
  titre: string;

  @ApiProperty()
  @Prop({ required: true })
  destination: string;

  @ApiProperty()
  @Prop({ type: Date, required: true })
  dateDebut: Date;

  @ApiProperty()
  @Prop({ type: Date, required: true })
  dateFin: Date;

  @ApiProperty()
  @Prop({ enum: TravelStatus, default: TravelStatus.PLANNED })
  statut: TravelStatus;

  @ApiProperty()
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'User', required: true })
  utilisateur: User;

  @ApiProperty()
  @Prop()
  budget?: number;

  @ApiProperty()
  @Prop([String])
  activitesPrevues?: string[];

  @ApiProperty()
  @Prop()
  notePersonnelle?: string;
}