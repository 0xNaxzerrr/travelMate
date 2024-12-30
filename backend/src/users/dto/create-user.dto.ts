import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Le nom est requis' })
  nom: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Le prénom est requis' })
  prenom: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @ApiProperty()
  @MinLength(8, { message: 'Le mot de passe doit faire au moins 8 caractères' })
  motDePasse: string;
}