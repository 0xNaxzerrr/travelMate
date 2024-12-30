import { Module } from '@nestjs/common';\nimport { HttpModule } from '@nestjs/axios';\nimport { MongooseModule } from '@nestjs/mongoose';\nimport { GeolocationService } from './geolocation.service';\nimport { GeolocationController } from './geolocation.controller';\nimport { Geolocation, GeolocationSchema } from './schemas/geolocation.schema';\nimport { DistanceCalculatorService } from './distance-calculator.service';\nimport { RouteCalculatorService } from './route-calculator.service';\nimport { TravelZoneService } from './travel-zone.service';\n\n@Module({\n  imports: [\n    HttpModule,\n    MongooseModule.forFeature([{ name: Geolocation.name, schema: GeolocationSchema }])\n  ],\n  controllers: [GeolocationController],\n  providers: [\n    GeolocationService, \n    DistanceCalculatorService,\n    RouteCalculatorService,\n    TravelZoneService\n  ],\n  exports: [\n    GeolocationService, \n    DistanceCalculatorService,\n    RouteCalculatorService,\n    TravelZoneService\n  ]\n})\nexport class GeolocationModule {}