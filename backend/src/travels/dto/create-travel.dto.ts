import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDate, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTravelDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Le titre est requis' })
  titre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La destination est requise' })
  destination: string;

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
  @IsNumber({}, { message: 'Budget invalide' })
  budget?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  activitesPrevues?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  notePersonnelle?: string;
}