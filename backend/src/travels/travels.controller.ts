import { Controller, Post, Body, Get, Param, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TravelsService } from './travels.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('voyages')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('voyages')
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Voyage créé' })
  async creerVoyage(
    @Request() req,
    @Body(new ValidationPipe()) createTravelDto: CreateTravelDto
  ) {
    return this.travelsService.create(createTravelDto, req.user.id);
  }

  @Get()
  async listerVoyages(@Request() req) {
    return this.travelsService.findAllByUser(req.user.id);
  }

  @Get(':id')
  async detailVoyage(
    @Request() req,
    @Param('id') travelId: string
  ) {
    return this.travelsService.findOneByUser(travelId, req.user.id);
  }
}