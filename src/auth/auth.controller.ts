import { Body, Controller, Post, Headers, UseGuards, Req } from '@nestjs/common';
import { AuthLogInDto } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { AuthGuard } from 'src/guard/auth.Guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() { email, password }: AuthLogInDto) {
        return this.authService.login(email, password);
    }


    @Post('register')
    async register(@Body() { email, name, password }: AuthRegisterDto) {

        return this.authService.register({ email, name, password });
    }

    @Post('forget')
    async forget(@Body() { email }: AuthForgetDto) {
        return this.authService.forget(email)
    }

    @Post('reset')
    async reset(@Body() { password, token }: AuthResetDto) {
        return this.authService.reset(password, token)
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@Req() req) {

        return {me:'ok', data: req.tokenPayLoad }
    }


}
