import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { GeolocationService } from './geolocation.service';
import { GeolocationController } from './geolocation.controller';
import { Geolocation, GeolocationSchema } from './schemas/geolocation.schema';
import { DistanceCalculatorService } from './distance-calculator.service';
import { RouteCalculatorService } from './route-calculator.service';
import { TravelZoneService } from './travel-zone.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Geolocation.name, schema: GeolocationSchema }])
  ],
  controllers: [GeolocationController],
  providers: [
    GeolocationService, 
    DistanceCalculatorService,
    RouteCalculatorService,
    TravelZoneService
  ],
  exports: [
    GeolocationService, 
    DistanceCalculatorService,
    RouteCalculatorService,
    TravelZoneService
  ]
})
export class GeolocationModule {}