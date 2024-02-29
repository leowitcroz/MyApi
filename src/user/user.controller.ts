import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() { email, name, password }: CreateUserDto) {
        return this.userService.create({ email, name, password })
    }

    @Get()
    async read() {
        return this.userService.read()
    }

    @Get(':id')
    async readOne(@Param() param) {

        return {
            user: [],
            param
        }

    }


    @Put(':id')
    async update(@Body() body: CreateUserDto, @Param() param) {
        return {
            body,
            param
        }
    }


}
