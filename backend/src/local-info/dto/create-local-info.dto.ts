import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsOptional, IsNumber, IsString } from 'class-validator';
import { InfoType } from '../schemas/local-info.schema';

export class CreateLocalInfoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'L\'ID du voyage est requis' })
  voyage: string;

  @ApiProperty({ enum: InfoType })
  @IsEnum(InfoType, { message: 'Type d\'information invalide' })
  type: InfoType;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le titre est requis' })
  titre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La description est requise' })
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber({}, { message: 'La température doit être un nombre' })
  temperature?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  conditions?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  risqueSante?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  alerteSecurite?: string;
}