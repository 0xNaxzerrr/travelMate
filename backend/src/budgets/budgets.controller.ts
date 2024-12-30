import { Controller, Post, Body, Get, Param, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto, BudgetEntryDto } from './dto/create-budget.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('budgets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Budget créé' })
  async creerBudget(
    @Body(new ValidationPipe()) createBudgetDto: CreateBudgetDto
  ) {
    return this.budgetsService.create(createBudgetDto);
  }

  @Post(':voyageId/depenses')
  @ApiResponse({ status: 201, description: 'Dépense ajoutée' })
  async ajouterDepense(
    @Param('voyageId') voyageId: string,
    @Body(new ValidationPipe()) depense: BudgetEntryDto
  ) {
    return this.budgetsService.ajouterDepense(voyageId, depense);
  }

  @Get(':voyageId')
  @ApiResponse({ status: 200, description: 'Informations du budget' })
  async recupererBudget(
    @Param('voyageId') voyageId: string
  ) {
    return this.budgetsService.getBudgetByTravel(voyageId);
  }

  @Get(':voyageId/statistiques')
  @ApiResponse({ status: 200, description: 'Statistiques du budget' })
  async obtenirStatistiquesBudget(
    @Param('voyageId') voyageId: string
  ) {
    return this.budgetsService.calculerStatistiques(voyageId);
  }
}