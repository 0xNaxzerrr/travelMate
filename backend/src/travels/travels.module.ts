import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TravelsService } from "./travels.service";
import { TravelsController } from "./travels.controller";
import { Travel, TravelSchema } from "./schemas/travel.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Travel.name, schema: TravelSchema }]),
  ],
  controllers: [TravelsController],
  providers: [TravelsService],
  exports: [MongooseModule, TravelsService],
})
export class TravelsModule {}
