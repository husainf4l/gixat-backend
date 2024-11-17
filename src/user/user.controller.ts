import { Controller, Post, Get, Put, Delete, Param, Body, Query, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { Headers } from '@nestjs/common';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Omit<User, 'password' | 'updatedAt'>[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string): Promise<Omit<User, 'password' | 'updatedAt'>> {
        return this.userService.findOne(id);
    }

    @Get('by-mobile')
    @HttpCode(HttpStatus.OK)
    async findByMobile(@Query('mobile') mobile: string): Promise<Omit<User, 'password' | 'updatedAt'>> {
        return this.userService.findByMobile(mobile);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Omit<User, 'password' | 'updatedAt'>> {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string): Promise<void> {
        await this.userService.remove(id);
    }

    @Get('user-info')
async getUserInfo(@Headers('authorization') token?: string) {
  const user = this.userService.getUserFromToken(token);

  return {
    userId: user.sub,
    companyId: user.companyId,
    role: user.role,
  };
}

}
