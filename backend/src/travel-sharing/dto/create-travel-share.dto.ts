import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsBoolean, IsDate, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTravelShareDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'L\'ID du voyage est requis' })
  voyage: string = '';

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  utilisateursAutorises?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  estPublic?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateExpiration?: Date;

  @ApiProperty({ enum: ['lecture', 'ecriture', 'complet'] })
  @IsIn(['lecture', 'ecriture', 'complet'], { message: 'Niveau d\'accès invalide' })
  niveauAcces: 'lecture' | 'ecriture' | 'complet' = 'lecture';
}