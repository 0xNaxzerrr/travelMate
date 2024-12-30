import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalInfoService } from './local-info.service';
import { LocalInfoController } from './local-info.controller';
import { LocalInfo, LocalInfoSchema } from './schemas/local-info.schema';
import { TravelsModule } from '../travels/travels.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LocalInfo.name, schema: LocalInfoSchema }]),
    TravelsModule
  ],
  controllers: [LocalInfoController],
  providers: [LocalInfoService],
  exports: [LocalInfoService]
})
export class LocalInfoModule {}