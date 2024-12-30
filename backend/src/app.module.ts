import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TravelsModule } from './travels/travels.module';
import { ItinerariesModule } from './itineraries/itineraries.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    AuthModule,
    TravelsModule,
    ItinerariesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}