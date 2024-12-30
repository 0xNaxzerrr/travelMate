import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';
import { Travel } from '../../travels/schemas/travel.schema';
import { ApiProperty } from '@nestjs/swagger';

export enum CategoryBudget {
  TRANSPORT = 'transport',
  HEBERGEMENT = 'hebergement',
  NOURRITURE = 'nourriture',
  ACTIVITES = 'activites',
  SHOPPING = 'shopping',
  AUTRE = 'autre'
}

@Schema({ timestamps: true })
export class BudgetEntry extends Document {
  @ApiProperty()
  @Prop({ required: true })
  description: string;

  @ApiProperty()
  @Prop({ required: true })
  montant: number;

  @ApiProperty()
  @Prop({ enum: CategoryBudget, default: CategoryBudget.AUTRE })
  categorie: CategoryBudget;

  @ApiProperty()
  @Prop({ type: Date, default: Date.now })
  date: Date;
}

@Schema({ timestamps: true })
export class Budget extends Document {
  @ApiProperty()
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Travel', required: true })
  voyage: Travel;

  @ApiProperty()
  @Prop({ required: true })
  budgetTotal: number;

  @ApiProperty()
  @Prop({ type: [BudgetEntry], default: [] })
  depenses: BudgetEntry[];

  @ApiProperty()
  @Prop()
  devises: string;

  @ApiProperty()
  calculerDepensesTotales(): number {
    return this.depenses.reduce((total, depense) => total + depense.montant, 0);
  }

  @ApiProperty()
  calculerResteADepenser(): number {
    return this.budgetTotal - this.calculerDepensesTotales();
  }
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
export const BudgetEntrySchema = SchemaFactory.createForClass(BudgetEntry);