import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recommendation, RecommendationType } from './schemas/recommendation.schema';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectModel(Recommendation.name) private recommendationModel: Model<Recommendation>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async create(utilisateurId: string, createRecommendationDto: CreateRecommendationDto): Promise<Recommendation> {
    const recommendation = new this.recommendationModel({
      utilisateur: utilisateurId,
      ...createRecommendationDto
    });

    return recommendation.save();
  }

  async findByUser(utilisateurId: string): Promise<Recommendation[]> {
    return this.recommendationModel.find({ utilisateur: utilisateurId });
  }

  async findByType(utilisateurId: string, type: RecommendationType): Promise<Recommendation[]> {
    return this.recommendationModel.find({ utilisateur: utilisateurId, type });
  }

  async genererRecommandationsIA(utilisateurId: string): Promise<Recommendation[]> {
    // TODO: Intégration avec un service d'IA pour générer des recommandations personnalisées
    return [
      {
        type: RecommendationType.DESTINATION,
        titre: 'Recommandation de destination',
        description: 'Basée sur vos préférences de voyage'
      } as Recommendation
    ];
  }
}