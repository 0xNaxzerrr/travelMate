import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsOptional, IsNumber, IsString } from 'class-validator';
import { RecommendationType } from '../schemas/recommendation.schema';

export class CreateRecommendationDto {
  @ApiProperty({ enum: RecommendationType })
  @IsEnum(RecommendationType, { message: 'Type de recommandation invalide' })
  type: RecommendationType = RecommendationType.DESTINATION;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le titre est requis' })
  titre: string = '';

  @ApiProperty()
  @IsNotEmpty({ message: 'La description est requise' })
  description: string = '';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  localisation?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Le score doit être un nombre' })
  score?: number;
}