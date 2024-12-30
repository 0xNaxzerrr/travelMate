import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  ValidationPipe,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";

@ApiTags("authentification")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Body() loginDto: { email: string; motDePasse: string }) {
    console.log("Tentative de connexion reçue"); // Log ajouté
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.motDePasse
    );
    if (!user) {
      console.log("Échec de la validation");
      throw new UnauthorizedException("Identifiants invalides");
    }
    console.log("Connexion réussie pour :", user);
    return this.authService.login(user);
  }

  @Post("inscription")
  async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.authService.login(user);
  }
}
