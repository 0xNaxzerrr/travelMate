import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Travel } from '../../travels/schemas/travel.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class VoyageStat extends Document {
  @ApiProperty()
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'User', required: true })
  utilisateur: User;

  @ApiProperty()
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Travel', required: true })
  voyage: Travel;

  @ApiProperty()
  @Prop()
  nombreActivites?: number;

  @ApiProperty()
  @Prop()
  nombreNotes?: number;

  @ApiProperty()
  @Prop()
  depensesTotales?: number;

  @ApiProperty()
  @Prop()
  kilometresParcourus?: number;

  @ApiProperty()
  @Prop()
  dureeVoyage?: number;

  @ApiProperty()
  @Prop()
  pays?: string[];

  @ApiProperty()
  @Prop()
  evaluationGenerale?: number;
}

export const VoyageStatSchema = SchemaFactory.createForClass(VoyageStat);