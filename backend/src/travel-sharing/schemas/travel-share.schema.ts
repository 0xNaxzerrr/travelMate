import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Travel } from '../../travels/schemas/travel.schema';
import { User } from '../../users/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class TravelShare extends Document {
  @ApiProperty()
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Travel', required: true })
  voyage: Travel;

  @ApiProperty()
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'User', required: true })
  proprietaire: User;

  @ApiProperty()
  @Prop({ type: [{ type: MongoSchema.Types.ObjectId, ref: 'User' }], default: [] })
  utilisateursAutorises: User[];

  @ApiProperty()
  @Prop({ required: true })
  lienPartage: string = '';

  @ApiProperty()
  @Prop({ default: false })
  estPublic: boolean = false;

  @ApiProperty()
  @Prop()
  dateExpiration?: Date;

  @ApiProperty()
  @Prop({ default: 'lecture' })
  niveauAcces: 'lecture' | 'ecriture' | 'complet' = 'lecture';
}

export const TravelShareSchema = SchemaFactory.createForClass(TravelShare);