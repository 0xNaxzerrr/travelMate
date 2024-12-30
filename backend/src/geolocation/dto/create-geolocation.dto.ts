import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGeolocationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({}, { message: 'La latitude doit être un nombre' })
  latitude: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({}, { message: 'La longitude doit être un nombre' })
  longitude: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  adresse?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ville?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  pays?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  codePostal?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}