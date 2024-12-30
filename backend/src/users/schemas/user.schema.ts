import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User extends Document {
  @ApiProperty()
  @Prop({ required: true })
  nom: string;

  @ApiProperty()
  @Prop({ required: true })
  prenom: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  motDePasse: string;

  @ApiProperty()
  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @ApiProperty()
  @Prop()
  dateDeNaissance?: Date;

  @ApiProperty()
  @Prop()
  pays?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);