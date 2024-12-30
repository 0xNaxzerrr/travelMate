import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VoyageStatsService } from './voyage-stats.service';
import { VoyageStatsController } from './voyage-stats.controller';
import { VoyageStat, VoyageStatSchema } from './schemas/voyage-stat.schema';
import { TravelsModule } from '../travels/travels.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VoyageStat.name, schema: VoyageStatSchema }]),
    TravelsModule
  ],
  controllers: [VoyageStatsController],
  providers: [VoyageStatsService],
  exports: [VoyageStatsService]
})
export class VoyageStatsModule {}