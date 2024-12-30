import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDate, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ItineraryStepDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Le lieu est requis' })
  lieu: string;

  @ApiProperty()
  @IsDate({ message: 'Date de début invalide' })
  @Type(() => Date)
  dateDebut: Date;

  @ApiProperty()
  @IsDate({ message: 'Date de fin invalide' })
  @Type(() => Date)
  dateFin: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateItineraryDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'L\'ID du voyage est requis' })
  voyage: string;

  @ApiProperty({ type: [ItineraryStepDto] })
  @ValidateNested({ each: true })
  @Type(() => ItineraryStepDto)
  etapes: ItineraryStepDto[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notePersonnelle?: string;
}