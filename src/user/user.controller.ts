import { Controller, Post, Get, Put, Delete, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto): Promise<Omit<User, 'password' | 'updatedAt' | 'isDeleted'>> {
        return this.userService.create(createUserDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Omit<User, 'password' | 'updatedAt' | 'isDeleted'>[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: number): Promise<Omit<User, 'password' | 'updatedAt' | 'isDeleted'>> {
        return this.userService.findOne(id);
    }

    @Get('by-mobile')
    @HttpCode(HttpStatus.OK)
    async findByMobile(@Query('mobile') mobile: string): Promise<Omit<User, 'password' | 'updatedAt' | 'isDeleted'>> {
        return this.userService.findByMobile(mobile);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<Omit<User, 'password' | 'updatedAt' | 'isDeleted'>> {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: number): Promise<void> {
        await this.userService.remove(id);
    }
}
