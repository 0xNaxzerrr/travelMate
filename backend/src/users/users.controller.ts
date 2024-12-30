import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@ApiTags('utilisateurs')
@Controller('utilisateurs')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('inscription')
  @ApiResponse({ status: 201, description: 'Utilisateur créé' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async creerUtilisateur(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto
  ): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}