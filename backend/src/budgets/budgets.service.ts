import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Budget, BudgetEntry, CategoryBudget } from './schemas/budget.schema';
import { CreateBudgetDto, BudgetEntryDto } from './dto/create-budget.dto';
import { Travel } from '../travels/schemas/travel.schema';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectModel(Budget.name) private budgetModel: Model<Budget>,
    @InjectModel(Travel.name) private travelModel: Model<Travel>
  ) {}

  async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    // Vérifier si le voyage existe
    const voyageExiste = await this.travelModel.findById(createBudgetDto.voyage);
    if (!voyageExiste) {
      throw new BadRequestException('Voyage non trouvé');
    }

    // Créer le budget
    const createdBudget = new this.budgetModel({
      voyage: createBudgetDto.voyage,
      budgetTotal: createBudgetDto.budgetTotal,
      devises: createBudgetDto.devises || 'EUR',
      depenses: createBudgetDto.depenses || []
    });

    return createdBudget.save();
  }

  async ajouterDepense(voyageId: string, depense: BudgetEntryDto): Promise<Budget> {
    const budget = await this.budgetModel.findOne({ voyage: voyageId });
    if (!budget) {
      throw new NotFoundException('Budget non trouvé');
    }

    budget.depenses.push(depense as BudgetEntry);
    return budget.save();
  }

  async getBudgetByTravel(voyageId: string): Promise<Budget> {
    const budget = await this.budgetModel.findOne({ voyage: voyageId });
    if (!budget) {
      throw new NotFoundException('Budget non trouvé');
    }
    return budget;
  }

  async calculerStatistiques(voyageId: string): Promise<any> {
    const budget = await this.getBudgetByTravel(voyageId);

    // Calcul des dépenses par catégorie
    const depensesParCategorie = budget.depenses.reduce((acc, depense) => {
      acc[depense.categorie] = (acc[depense.categorie] || 0) + depense.montant;
      return acc;
    }, {});

    return {
      budgetTotal: budget.budgetTotal,
      depensesTotales: budget.calculerDepensesTotales(),
      resteADepenser: budget.calculerResteADepenser(),
      depensesParCategorie
    };
  }
}