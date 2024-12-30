import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Itinerary, ItineraryStep } from './schemas/itinerary.schema';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { Travel } from '../travels/schemas/travel.schema';

@Injectable()
export class ItinerariesService {
  constructor(
    @InjectModel(Itinerary.name) private itineraryModel: Model<Itinerary>,
    @InjectModel(Travel.name) private travelModel: Model<Travel>
  ) {}

  async create(createItineraryDto: CreateItineraryDto): Promise<Itinerary> {
    // Vérifier si le voyage existe
    const voyageExiste = await this.travelModel.findById(createItineraryDto.voyage);
    if (!voyageExiste) {
      throw new BadRequestException('Voyage non trouvé');
    }

    // Créer l'itinéraire
    const createdItinerary = new this.itineraryModel({
      voyage: createItineraryDto.voyage,
      etapes: createItineraryDto.etapes,
      notePersonnelle: createItineraryDto.notePersonnelle
    });

    return createdItinerary.save();
  }

  async findByTravel(voyageId: string): Promise<Itinerary | null> {
    return this.itineraryModel.findOne({ voyage: voyageId }).populate('voyage');
  }

  async update(voyageId: string, updateData: Partial<Itinerary>): Promise<Itinerary | null> {
    return this.itineraryModel.findOneAndUpdate(
      { voyage: voyageId }, 
      updateData, 
      { new: true }
    );
  }

  async delete(voyageId: string): Promise<void> {
    const result = await this.itineraryModel.deleteOne({ voyage: voyageId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Itinéraire non trouvé');
    }
  }
}