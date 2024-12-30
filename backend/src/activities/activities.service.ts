import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityType } from './schemas/activity.schema';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Travel } from '../travels/schemas/travel.schema';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<Activity>,
    @InjectModel(Travel.name) private travelModel: Model<Travel>
  ) {}

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const voyageExiste = await this.travelModel.findById(createActivityDto.voyage);
    if (!voyageExiste) {
      throw new NotFoundException('Voyage non trouvé');
    }

    const activity = new this.activityModel(createActivityDto);
    return activity.save();
  }

  async findByTravel(voyageId: string): Promise<Activity[]> {
    return this.activityModel.find({ voyage: voyageId });
  }

  async findByType(voyageId: string, type: ActivityType): Promise<Activity[]> {
    return this.activityModel.find({ voyage: voyageId, type });
  }

  async update(id: string, updateData: Partial<CreateActivityDto>): Promise<Activity> {
    const activity = await this.activityModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!activity) {
      throw new NotFoundException('Activité non trouvée');
    }
    return activity;
  }

  async delete(id: string): Promise<void> {
    const result = await this.activityModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Activité non trouvée');
    }
  }
}