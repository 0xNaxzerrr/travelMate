import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "email", // Remplace 'username' par 'email'
      passwordField: "motDePasse", // Déclare 'motDePasse' pour le mot de passe
    });
  }

  async validate(email: string, motDePasse: string): Promise<any> {
    console.log(`Validation appelée avec email : ${email}`);
    const user = await this.authService.validateUser(email, motDePasse);
    if (!user) {
      console.log("Validation échouée dans la stratégie locale");
      throw new UnauthorizedException("Email ou mot de passe invalide");
    }
    console.log("Validation réussie pour utilisateur :", user);
    return user;
  }
}
