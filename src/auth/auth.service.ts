import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';

@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService, private readonly userService: UserService) { }


    createToken(user: User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email,

            },
                {
                    issuer: 'login',
                    audience: 'user',
                    expiresIn: '7 days',
                    subject: String(user.id),
                }

            )
        }
    }

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                issuer: 'login',
                audience: 'user'
            });
            return data;

        } catch (e) {
            throw new BadRequestException(e);
        }
    }


    async login(email: string, password: string) {

        const user = await this.prisma.user.findFirst({
            where: {
                email,
                password,
            }
        });

        if (!user) {
            throw new UnauthorizedException('Senha ou email incorretos')
        }

        return this.createToken(user);
    }

    async forget(email: string) {
        const user = this.prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            throw new UnauthorizedException('email incorreto')
        }

        // Enviar email para trocar senha

        return true
    }

    async reset(password: string, token: string) {
        // validar token

        // extrair id do token

        const id = 0

        const user = await this.prisma.user.update({
            where: {
                id
            },
            data: {
                password
            }
        });

        return this.createToken(user)
    }

    async register({ email, name, password, role }) {
        const user = await this.userService.create({ email, name, password, role })

        return this.createToken(user);
    }

}
