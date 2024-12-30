import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LocalInfoService } from './local-info.service';
import { CreateLocalInfoDto } from './dto/create-local-info.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InfoType } from './schemas/local-info.schema';

@ApiTags('informations-locales')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('informations-locales')
export class LocalInfoController {
  constructor(private readonly localInfoService: LocalInfoService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Information locale créée' })
  async creerInformationLocale(
    @Body(new ValidationPipe()) createLocalInfoDto: CreateLocalInfoDto
  ) {
    return this.localInfoService.create(createLocalInfoDto);
  }

  @Get(':voyageId')
  @ApiResponse({ status: 200, description: 'Liste des informations locales du voyage' })
  async listerInformationsLocales(@Param('voyageId') voyageId: string) {
    return this.localInfoService.findByTravel(voyageId);
  }

  @Get(':voyageId/:type')
  @ApiResponse({ status: 200, description: 'Liste des informations locales par type' })
  async listerInformationsLocalesParType(
    @Param('voyageId') voyageId: string,
    @Param('type') type: InfoType
  ) {
    return this.localInfoService.findByType(voyageId, type);
  }

  @Get('meteo/:pays')
  @ApiResponse({ status: 200, description: 'Informations météorologiques' })
  async recupererMeteo(@Param('pays') pays: string) {
    return this.localInfoService.rechercherInformationsMeteo(pays);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Information locale mise à jour' })
  async mettreAJourInformationLocale(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateData: Partial<CreateLocalInfoDto>
  ) {
    return this.localInfoService.update(id, updateData);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Information locale supprimée' })
  async supprimerInformationLocale(@Param('id') id: string) {
    await this.localInfoService.delete(id);
    return { message: 'Information locale supprimée' };
  }
}