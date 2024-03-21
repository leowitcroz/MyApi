import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { PatchUserDto } from './dto/patch-user.dto';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/role.decorator';
import { AuthGuard } from 'src/guard/auth.Guard';
import { RoleGuard } from 'src/guard/role.Guard';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() { email, name, password, role }: CreateUserDto) {
        return await this.userService.create({ email, name, password, role })
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
    async update(@Body() { email, name, password,role }: PatchUserDto, @Param('id', ParseIntPipe) id) {
        return this.userService.update(id, { email, name, password, role })
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id) {
        return this.userService.delete(id)
    }


}
