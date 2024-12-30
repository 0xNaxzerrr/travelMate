import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ActivityType } from './schemas/activity.schema';

@ApiTags('activites')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('activites')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Activité créée' })
  async creerActivite(
    @Body(new ValidationPipe()) createActivityDto: CreateActivityDto
  ) {
    return this.activitiesService.create(createActivityDto);
  }

  @Get(':voyageId')
  @ApiResponse({ status: 200, description: 'Liste des activités du voyage' })
  async listerActivites(@Param('voyageId') voyageId: string) {
    return this.activitiesService.findByTravel(voyageId);
  }

  @Get(':voyageId/:type')
  @ApiResponse({ status: 200, description: 'Liste des activités par type' })
  async listerActivitesParType(
    @Param('voyageId') voyageId: string,
    @Param('type') type: ActivityType
  ) {
    return this.activitiesService.findByType(voyageId, type);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Activité mise à jour' })
  async mettreAJourActivite(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateData: Partial<CreateActivityDto>
  ) {
    return this.activitiesService.update(id, updateData);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Activité supprimée' })
  async supprimerActivite(@Param('id') id: string) {
    await this.activitiesService.delete(id);
    return { message: 'Activité supprimée' };
  }
}