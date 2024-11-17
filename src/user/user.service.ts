import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService,     private readonly jwtService: JwtService    ) { }



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
    async findOne(id: string): Promise<Omit<User, 'password' | 'updatedAt'>> {
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
    async update(id: string, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password' | 'updatedAt'>> {
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
    async remove(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id },
        });
    }
    
    getUserFromToken(token?: string): any {
        if (!token) {
          throw new UnauthorizedException('Token is required');
        }
    
        // Extract the access token (removing "Bearer ")
        const accessToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
    
        try {
          return this.jwtService.verify(accessToken, { secret: process.env.JWT_SECRET });
        } catch (error) {
          console.error('JWT Verification Error:', error.message);
          throw new UnauthorizedException('Invalid or expired token');
        }
      }
      
    
      // Extract companyId from token
      getCompanyId(token: string): string {
        const user = this.getUserFromToken(token);
        if (!user?.companyId) {
          throw new UnauthorizedException('Token is missing companyId');
        }
        return user.companyId;
      }
    
      // Extract userId from token
      getUserId(token: string): string {
        const user = this.getUserFromToken(token);
        if (!user?.sub) {
          throw new UnauthorizedException('Token is missing userId');
        }
        return user.sub;
      }
    
      // Extract role from token
      getRole(token: string): string {
        const user = this.getUserFromToken(token);
        if (!user?.role) {
          throw new UnauthorizedException('Token is missing role');
        }
        return user.role;
      }
    




}
