import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateUserDto {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 5,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    })
    password: string

    @IsOptional()
    @IsEnum(Role)
    role: number;
}