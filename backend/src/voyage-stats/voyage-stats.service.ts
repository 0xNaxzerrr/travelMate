import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VoyageStat } from './schemas/voyage-stat.schema';
import { CreateVoyageStatDto } from './dto/create-voyage-stat.dto';
import { Travel } from '../travels/schemas/travel.schema';

@Injectable()
export class VoyageStatsService {
  constructor(
    @InjectModel(VoyageStat.name) private voyageStatModel: Model<VoyageStat>,
    @InjectModel(Travel.name) private travelModel: Model<Travel>
  ) {}

  async create(utilisateurId: string, createVoyageStatDto: CreateVoyageStatDto): Promise<VoyageStat> {
    const voyage = await this.travelModel.findById(createVoyageStatDto.voyage);
    if (!voyage) {
      throw new NotFoundException('Voyage non trouvé');
    }

    const stat = new this.voyageStatModel({
      utilisateur: utilisateurId,
      voyage: createVoyageStatDto.voyage,
      ...createVoyageStatDto
    });

    return stat.save();
  }

  async getStatsByTravel(voyageId: string): Promise<VoyageStat> {
    const stat = await this.voyageStatModel.findOne({ voyage: voyageId });
    if (!stat) {
      throw new NotFoundException('Statistiques de voyage non trouvées');
    }
    return stat;
  }

  async getStatsByUser(utilisateurId: string): Promise<VoyageStat[]> {
    return this.voyageStatModel.find({ utilisateur: utilisateurId }).populate('voyage');
  }

  async calculerStatistiquesGlobales(utilisateurId: string): Promise<any> {
    const stats = await this.voyageStatModel.find({ utilisateur: utilisateurId });

    return {
      nombreTotalVoyages: stats.length,
      depensesTotales: stats.reduce((total, stat) => total + (stat.depensesTotales || 0), 0),
      kilometresTotaux: stats.reduce((total, stat) => total + (stat.kilometresParcourus || 0), 0),
      payesVisites: [...new Set(stats.flatMap(stat => stat.pays || []))]
    };
  }
}