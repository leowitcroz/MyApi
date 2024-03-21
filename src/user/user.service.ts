import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) { }

    async create({ email, name, password }: CreateUserDto) {

        password = await bcrypt.hash(password, await bcrypt.genSalt())
        
        return await this.prisma.user.create({
            data: {
                email,
                name,
                password
            }
        })
    }

    async read() {
        return await this.prisma.user.findMany()
    }

    async readOne(id: number) {
        return await this.prisma.user.findUnique({
            where: {
                id,
            }
        })
    }

    async update(id: number, data: PatchUserDto) {

        await this.exists(id)

        
        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())

        return await this.prisma.user.update({

            data,
            where: {
                id
            }

        })
    }

    async delete(id: number) {

        await this.exists(id)

        return await this.prisma.user.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number) {
        if (!(await this.readOne(id))) {
            throw new NotFoundException('The user doesnt exist');
        }
    }

}
