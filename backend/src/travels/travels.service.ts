import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Travel } from './schemas/travel.schema';
import { CreateTravelDto } from './dto/create-travel.dto';

@Injectable()
export class TravelsService {
  constructor(
    @InjectModel(Travel.name) private travelModel: Model<Travel>
  ) {}

  async create(createTravelDto: CreateTravelDto, utilisateurId: string): Promise<Travel> {
    const createdTravel = new this.travelModel({
      ...createTravelDto,
      utilisateur: utilisateurId
    });
    return createdTravel.save();
  }

  async findAllByUser(utilisateurId: string): Promise<Travel[]> {
    return this.travelModel.find({ utilisateur: utilisateurId });
  }

  async findOneByUser(travelId: string, utilisateurId: string): Promise<Travel> {
    const travel = await this.travelModel.findOne({ _id: travelId, utilisateur: utilisateurId });
    if (!travel) {
      throw new NotFoundException('Voyage non trouvé');
    }
    return travel;
  }
}