import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    console.log("Utilisateur trouvé :", user);

    if (user && (await bcrypt.compare(pass, user.motDePasse))) {
      console.log("Mot de passe validé pour :", email);
      const { motDePasse, ...result } = user.toObject();
      return result;
    }

    console.log("Validation échouée pour :", email);
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
      },
    };
  }
}
