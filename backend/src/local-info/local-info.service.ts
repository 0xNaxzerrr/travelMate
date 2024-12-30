import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LocalInfo, InfoType } from './schemas/local-info.schema';
import { CreateLocalInfoDto } from './dto/create-local-info.dto';
import { Travel } from '../travels/schemas/travel.schema';

@Injectable()
export class LocalInfoService {
  constructor(
    @InjectModel(LocalInfo.name) private localInfoModel: Model<LocalInfo>,
    @InjectModel(Travel.name) private travelModel: Model<Travel>
  ) {}

  async create(createLocalInfoDto: CreateLocalInfoDto): Promise<LocalInfo> {
    const voyageExiste = await this.travelModel.findById(createLocalInfoDto.voyage);
    if (!voyageExiste) {
      throw new NotFoundException('Voyage non trouvé');
    }

    const localInfo = new this.localInfoModel(createLocalInfoDto);
    return localInfo.save();
  }

  async findByTravel(voyageId: string): Promise<LocalInfo[]> {
    return this.localInfoModel.find({ voyage: voyageId });
  }

  async findByType(voyageId: string, type: InfoType): Promise<LocalInfo[]> {
    return this.localInfoModel.find({ voyage: voyageId, type });
  }

  async update(id: string, updateData: Partial<CreateLocalInfoDto>): Promise<LocalInfo> {
    const localInfo = await this.localInfoModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!localInfo) {
      throw new NotFoundException('Information locale non trouvée');
    }
    return localInfo;
  }

  async delete(id: string): Promise<void> {
    const result = await this.localInfoModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Information locale non trouvée');
    }
  }

  async rechercherInformationsMeteo(pays: string): Promise<any> {
    // TODO: Intégration avec une API météo externe
    // Exemple de mock pour démonstration
    return {
      pays,
      temperature: 25,
      conditions: 'Ensoleillé',
      risqueSante: 'Minimal'
    };
  }
}