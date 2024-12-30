import { Controller, Post, Body, Get, Param, Delete, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TravelSharingService } from './travel-sharing.service';
import { CreateTravelShareDto } from './dto/create-travel-share.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('partage-voyage')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('partage-voyage')
export class TravelSharingController {
  constructor(private readonly travelSharingService: TravelSharingService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Partage de voyage créé' })
  async creerPartage(
    @Request() req,
    @Body(new ValidationPipe()) createTravelShareDto: CreateTravelShareDto
  ) {
    return this.travelSharingService.create(req.user.id, createTravelShareDto);
  }

  @Get('lien/:lienPartage')
  @ApiResponse({ status: 200, description: 'Informations du voyage partagé' })
  async recupererParLien(@Param('lienPartage') lienPartage: string) {
    return this.travelSharingService.recupererParLien(lienPartage);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Partage supprimé' })
  async supprimerPartage(
    @Request() req,
    @Param('id') shareId: string
  ) {
    await this.travelSharingService.supprimerPartage(req.user.id, shareId);
    return { message: 'Partage supprimé' };
  }
}