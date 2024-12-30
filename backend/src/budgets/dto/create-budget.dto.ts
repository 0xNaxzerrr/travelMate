import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryBudget } from '../schemas/budget.schema';

export class BudgetEntryDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'La description est requise' })
  description: string;

  @ApiProperty()
  @IsNumber({}, { message: 'Le montant doit être un nombre' })
  montant: number;

  @ApiProperty({ enum: CategoryBudget })
  @IsString()
  categorie: CategoryBudget;
}

export class CreateBudgetDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'L\'ID du voyage est requis' })
  voyage: string;

  @ApiProperty()
  @IsNumber({}, { message: 'Le budget total doit être un nombre' })
  budgetTotal: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  devises?: string;

  @ApiProperty({ type: [BudgetEntryDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => BudgetEntryDto)
  @IsOptional()
  depenses?: BudgetEntryDto[];
}