import { Controller, Post, Body, Get, Query, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GeolocationService } from './geolocation.service';
import { CreateGeolocationDto } from './dto/create-geolocation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('geolocalisation')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('geolocalisation')
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Géolocalisation créée' })
  async create(@Body(new ValidationPipe()) createGeolocationDto: CreateGeolocationDto) {
    return this.geolocationService.create(createGeolocationDto);
  }

  @Get('reverse-geocoding')
  @ApiResponse({ status: 200, description: 'Informations de géolocalisation' })
  async reverseGeocoding(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number
  ) {
    return this.geolocationService.reverseGeocoding(latitude, longitude);
  }

  @Get('geocoding')
  @ApiResponse({ status: 200, description: 'Coordonnées GPS' })
  async geocoding(@Query('adresse') adresse: string) {
    return this.geolocationService.geocoding(adresse);
  }
}