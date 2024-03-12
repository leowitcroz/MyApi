
import { IsEmail, IsStrongPassword } from "class-validator";

export class AuthForgetDto{
    @IsEmail()
    email : string

}