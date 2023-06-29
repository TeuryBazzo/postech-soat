import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { IsUniqueCpf } from "../validations/isUniqueCpf.validation";

export class CreateClientDto {
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @MinLength(11)
    @MaxLength(11)
    @Matches(/\d{11}/g)
    @Validate(IsUniqueCpf)
    cpf: string;
  }