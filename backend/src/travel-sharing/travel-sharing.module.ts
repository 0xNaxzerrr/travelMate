import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelSharingService } from './travel-sharing.service';
import { TravelSharingController } from './travel-sharing.controller';
import { TravelShare, TravelShareSchema } from './schemas/travel-share.schema';
import { TravelsModule } from '../travels/travels.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TravelShare.name, schema: TravelShareSchema }]),
    TravelsModule,
    UsersModule
  ],
  controllers: [TravelSharingController],
  providers: [TravelSharingService],
  exports: [TravelSharingService]
})
export class TravelSharingModule {}