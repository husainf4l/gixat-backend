import { Controller, Post, Get, Param, Body, Delete, Patch, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';



@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // Create a new user
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }


    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(@Req() req: any) {
        return this.userService.findAll();
    }


    // Fetch a single user by ID
    @Get(':id')
    @UseGuards(JwtAuthGuard)

    async findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    // Update a user by ID
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    // Soft delete a user by ID
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
