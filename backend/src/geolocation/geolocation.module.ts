import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GeolocationService } from './geolocation.service';
import { GeolocationController } from './geolocation.controller';
import { Geolocation, GeolocationSchema } from './schemas/geolocation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Geolocation.name, schema: GeolocationSchema }])
  ],
  controllers: [GeolocationController],
  providers: [GeolocationService],
  exports: [GeolocationService]
})
export class GeolocationModule {}