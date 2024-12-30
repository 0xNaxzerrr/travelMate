import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TravelsModule } from './travels/travels.module';
import { ItinerariesModule } from './itineraries/itineraries.module';
import { BudgetsModule } from './budgets/budgets.module';
import { ActivitiesModule } from './activities/activities.module';
import { LocalInfoModule } from './local-info/local-info.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    AuthModule,
    TravelsModule,
    ItinerariesModule,
    BudgetsModule,
    ActivitiesModule,
    LocalInfoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}