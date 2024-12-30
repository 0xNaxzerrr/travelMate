import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TravelShare } from './schemas/travel-share.schema';
import { CreateTravelShareDto } from './dto/create-travel-share.dto';
import { Travel } from '../travels/schemas/travel.schema';
import { User } from '../users/schemas/user.schema';
import { randomBytes } from 'crypto';

@Injectable()
export class TravelSharingService {
  constructor(
    @InjectModel(TravelShare.name) private travelShareModel: Model<TravelShare>,
    @InjectModel(Travel.name) private travelModel: Model<Travel>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async create(proprietaireId: string, createTravelShareDto: CreateTravelShareDto): Promise<TravelShare> {
    const voyage = await this.travelModel.findOne({ _id: createTravelShareDto.voyage, utilisateur: proprietaireId });
    if (!voyage) {
      throw new NotFoundException('Voyage non trouvé ou non autorisé');
    }

    const lienPartage = randomBytes(16).toString('hex');

    const travelShare = new this.travelShareModel({
      voyage: createTravelShareDto.voyage,
      proprietaire: proprietaireId,
      lienPartage: lienPartage,
      estPublic: createTravelShareDto.estPublic || false,
      dateExpiration: createTravelShareDto.dateExpiration,
      niveauAcces: createTravelShareDto.niveauAcces || 'lecture'
    });

    return travelShare.save();
  }

  async recupererParLien(lienPartage: string): Promise<TravelShare> {
    const partage = await this.travelShareModel
      .findOne({ lienPartage })
      .populate('voyage')
      .populate('proprietaire', 'nom prenom email');

    if (!partage) {
      throw new NotFoundException('Lien de partage invalide');
    }

    if (partage.dateExpiration && partage.dateExpiration < new Date()) {
      throw new BadRequestException('Ce lien de partage a expiré');
    }

    return partage;
  }

  async supprimerPartage(proprietaireId: string, shareId: string): Promise<void> {
    const resultat = await this.travelShareModel.deleteOne({
      _id: shareId,
      proprietaire: proprietaireId
    });

    if (resultat.deletedCount === 0) {
      throw new NotFoundException('Partage non trouvé');
    }
  }
}