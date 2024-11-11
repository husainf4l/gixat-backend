import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }



    // Fetch all users, excluding password
    async findAll(): Promise<Omit<User, 'password' | 'updatedAt'>[]> {
        return this.prisma.user.findMany({
            select: {
                id: true,
                mobile: true,
                name: true,
                role: true,
                createdAt: true,
                companyId: true
            },
        });
    }

    // Fetch a single user by ID
    async findOne(id: number): Promise<Omit<User, 'password' | 'updatedAt'>> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                mobile: true,
                name: true,
                role: true,
                createdAt: true,
                companyId: true

            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    // Fetch user by mobile (for login or other purposes)
    async findByMobile(mobile: string): Promise<Omit<User, 'password' | 'updatedAt'>> {
        const user = await this.prisma.user.findUnique({
            where: { mobile },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    // Update user by ID
    async update(id: number, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password' | 'updatedAt'>> {
        const { mobile, name, password } = updateUserDto;

        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        return this.prisma.user.update({
            where: { id },
            data: {
                mobile,
                name,
                password: hashedPassword,
            },
            select: {
                id: true,
                mobile: true,
                name: true,
                role: true,
                createdAt: true,
                companyId: true

            },
        });
    }

    // Soft delete a user by ID
    async remove(id: number): Promise<void> {
        await this.prisma.user.delete({
            where: { id },
        });
    }
}
