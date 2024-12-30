import { Controller, Post, Body, Get, Param, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RecommendationsService } from './recommendations.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RecommendationType } from './schemas/recommendation.schema';

@ApiTags('recommandations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('recommandations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Recommandation créée' })
  async creerRecommandation(
    @Request() req,
    @Body(new ValidationPipe()) createRecommandationDto: CreateRecommendationDto
  ) {
    return this.recommendationsService.create(req.user.id, createRecommandationDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Liste des recommandations' })
  async listerRecommandations(@Request() req) {
    return this.recommendationsService.findByUser(req.user.id);
  }

  @Get(':type')
  @ApiResponse({ status: 200, description: 'Liste des recommandations par type' })
  async listerRecommandationsParType(
    @Request() req,
    @Param('type') type: RecommendationType
  ) {
    return this.recommendationsService.findByType(req.user.id, type);
  }

  @Get('ai/suggestions')
  @ApiResponse({ status: 200, description: 'Recommandations générées par IA' })
  async obtenirRecommandationsIA(@Request() req) {
    return this.recommendationsService.genererRecommandationsIA(req.user.id);
  }
}