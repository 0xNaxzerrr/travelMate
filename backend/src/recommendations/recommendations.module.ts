import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RecommendationsService } from "./recommendations.service";
import { RecommendationsController } from "./recommendations.controller";
import {
  Recommendation,
  RecommendationSchema,
} from "./schemas/recommendation.schema";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recommendation.name, schema: RecommendationSchema },
    ]),
    UsersModule,
  ],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
  exports: [RecommendationsService],
})
export class RecommendationsModule {}
