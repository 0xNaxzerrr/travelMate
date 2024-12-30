import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TravelsModule } from './travels/travels.module';
import { ItinerariesModule } from './itineraries/itineraries.module';
import { BudgetsModule } from './budgets/budgets.module';
import { ActivitiesModule } from './activities/activities.module';
import { LocalInfoModule } from './local-info/local-info.module';
import { TravelSharingModule } from './travel-sharing/travel-sharing.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { VoyageStatsModule } from './voyage-stats/voyage-stats.module';
import { GeolocationModule } from './geolocation/geolocation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    UsersModule,
    AuthModule,
    TravelsModule,
    ItinerariesModule,
    BudgetsModule,
    ActivitiesModule,
    LocalInfoModule,
    TravelSharingModule,
    RecommendationsModule,
    VoyageStatsModule,
    GeolocationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}