import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsOptional, IsNumber, IsString } from 'class-validator';
import { ActivityType } from '../schemas/activity.schema';

export class CreateActivityDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Le nom de l\'activité est requis' })
  nom: string = '';

  @ApiProperty()
  @IsNotEmpty({ message: 'La description est requise' })
  description: string = '';

  @ApiProperty({ enum: ActivityType })
  @IsEnum(ActivityType, { message: 'Type d\'activité invalide' })
  type: ActivityType = ActivityType.AUTRES;

  @ApiProperty()
  @IsNotEmpty({ message: 'L\'ID du voyage est requis' })
  voyage: string = '';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lieu?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  dateActivite?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber({}, { message: 'La durée doit être un nombre' })
  duree?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Le coût doit être un nombre' })
  cout?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber({}, { message: 'La note doit être un nombre' })
  note?: number;
}