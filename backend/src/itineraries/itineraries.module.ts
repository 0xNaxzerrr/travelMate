import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItinerariesService } from './itineraries.service';
import { ItinerariesController } from './itineraries.controller';
import { Itinerary, ItinerarySchema, ItineraryStep, ItineraryStepSchema } from './schemas/itinerary.schema';
import { TravelsModule } from '../travels/travels.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Itinerary.name, schema: ItinerarySchema },
      { name: ItineraryStep.name, schema: ItineraryStepSchema }
    ]),
    TravelsModule
  ],
  controllers: [ItinerariesController],
  providers: [ItinerariesService],
  exports: [ItinerariesService]
})
export class ItinerariesModule {}