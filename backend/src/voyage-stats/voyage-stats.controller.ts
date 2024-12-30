import { Controller, Post, Body, Get, Param, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { VoyageStatsService } from './voyage-stats.service';
import { CreateVoyageStatDto } from './dto/create-voyage-stat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('statistiques-voyage')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('statistiques-voyage')
export class VoyageStatsController {
  constructor(private readonly voyageStatsService: VoyageStatsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Statistiques de voyage créées' })
  async creerStatistiques(
    @Request() req,
    @Body(new ValidationPipe()) createVoyageStatDto: CreateVoyageStatDto
  ) {
    return this.voyageStatsService.create(req.user.id, createVoyageStatDto);
  }

  @Get('voyage/:voyageId')
  @ApiResponse({ status: 200, description: 'Statistiques détaillées du voyage' })
  async obtenirStatistiquesVoyage(@Param('voyageId') voyageId: string) {
    return this.voyageStatsService.getStatsByTravel(voyageId);
  }

  @Get()  
  @ApiResponse({ status: 200, description: 'Liste des statistiques de voyage' })
  async listerStatistiques(@Request() req) {
    return this.voyageStatsService.getStatsByUser(req.user.id);
  }

  @Get('global')
  @ApiResponse({ status: 200, description: 'Statistiques globales' })
  async obtenirStatistiquesGlobales(@Request() req) {
    return this.voyageStatsService.calculerStatistiquesGlobales(req.user.id);
  }
}