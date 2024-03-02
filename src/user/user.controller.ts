import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { PatchUserDto } from './dto/patch-user.dto';

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
    async readOne(@Param('id', ParseIntPipe) id) {
        return this.userService.readOne(id)

    }

    @Patch(':id')
    async update(@Body() { email, name, password }: PatchUserDto, @Param('id', ParseIntPipe) id) {
        return this.userService.update(id, { email, name, password })
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id) {
        return this.userService.delete(id)
    }


}
