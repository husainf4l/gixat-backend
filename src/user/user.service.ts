import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    // Create a new user
    async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password' | 'updatedAt' | 'isDeleted'>> {
        const { mobile, password, role, name } = createUserDto;

        // Check if the mobile number is already registered
        const existingUser = await this.prisma.user.findUnique({
            where: { mobile },
        });

        if (existingUser) {
            throw new ConflictException('Mobile number already registered');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user in the database
        const user = await this.prisma.user.create({
            data: {
                mobile,
                name,
                password: hashedPassword,
                role,
            },
        });

        // Exclude password in return
        delete user.password;

        return user;
    }

    // Fetch all users, excluding password
    async findAll(): Promise<Omit<User, 'password' | 'updatedAt' | 'isDeleted'>[]> {
        return this.prisma.user.findMany({
            where: { isDeleted: false },
            select: {
                id: true,
                mobile: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });
    }

    // Fetch a single user by ID
    async findOne(id: number): Promise<Omit<User, 'password' | 'updatedAt' | 'isDeleted'>> {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                mobile: true,
                name: true,
                role: true,
                createdAt: true,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    // Fetch user by mobile (for login or other purposes)
    async findByMobile(mobile: string): Promise<Omit<User, 'password' | 'updatedAt' | 'isDeleted'>> {
        const user = await this.prisma.user.findUnique({
            where: { mobile },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    // Update user by ID
    async update(id: number, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password' | 'updatedAt' | 'isDeleted'>> {
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
            },
        });
    }

    // Soft delete a user by ID
    async remove(id: number): Promise<void> {
        await this.prisma.user.update({
            where: { id },
            data: {
                isDeleted: true,
            },
        });
    }
}
