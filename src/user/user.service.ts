import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async create({ email, name, password }: CreateUserDto) {
        return await this.prisma.user.create({
            data: {
                email,
                name,
                password
            }
        })
    }

    async read(){
        return await this.prisma.user.findMany()
    }

}
