import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsArray, IsString } from 'class-validator';

export class CreateVoyageStatDto {
  @ApiProperty()
  voyage: string = '';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  nombreActivites?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  nombreNotes?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  depensesTotales?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  kilometresParcourus?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  dureeVoyage?: number;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pays?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  evaluationGenerale?: number;
}