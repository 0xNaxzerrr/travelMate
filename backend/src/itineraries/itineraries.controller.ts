import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ItinerariesService } from './itineraries.service';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('itineraires')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('itineraires')
export class ItinerariesController {
  constructor(private readonly itinerariesService: ItinerariesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Itinéraire créé' })
  async creerItineraire(
    @Body(new ValidationPipe()) createItineraryDto: CreateItineraryDto
  ) {
    return this.itinerariesService.create(createItineraryDto);
  }

  @Get(':voyageId')
  async recupererItineraire(@Param('voyageId') voyageId: string) {
    return this.itinerariesService.findByTravel(voyageId);
  }

  @Put(':voyageId')
  async mettreAJourItineraire(
    @Param('voyageId') voyageId: string,
    @Body() updateData: any
  ) {
    return this.itinerariesService.update(voyageId, updateData);
  }

  @Delete(':voyageId')
  async supprimerItineraire(@Param('voyageId') voyageId: string) {
    await this.itinerariesService.delete(voyageId);
    return { message: 'Itinéraire supprimé' };
  }
}