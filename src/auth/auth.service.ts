import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginRequest, SignupRequest } from './dto/auth.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
    private readonly secret: string;

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {
        this.secret = this.configService.get<string>('JWT_SECRET');
    }

    async validateUser(mobile: string, pass: string): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { mobile } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (!isPasswordValid) {
            throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
        }

        const { password, ...result } = user; // Exclude password from the result
        return result;
    }

    async login(user: { id: string; mobile: string; role: UserRole; companyId: string }) {
        const payload = {
            mobile: user.mobile,
            sub: user.id,
            role: user.role,
            companyId: user.companyId,
        };

        const token = this.jwtService.sign(payload, { expiresIn: '1h' });

        return {
            access_token: token,
            user_id: user.id,
            companyId: user.companyId,
        };
    }

    async verifyToken(token: string): Promise<any> {
        try {
            return this.jwtService.verify(token, { secret: this.secret });
        } catch (error) {
            throw new HttpException('Invalid or expired token', HttpStatus.UNAUTHORIZED);
        }
    }

    async signup(user: SignupRequest) {
        // Check if the user already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { mobile: user.mobile },
        });

        if (existingUser) {
            throw new HttpException(
                'User already exists with this mobile number',
                HttpStatus.BAD_REQUEST,
            );
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Create the new user in the database
        const newUser = await this.prisma.user.create({
            data: {
                name: user.name,
                mobile: user.mobile,
                password: hashedPassword,
                role: user.role as UserRole, // Ensure role matches the UserRole enum
            },
        });

        // Return token and user_id after successful signup
        return this.login({
            id: newUser.id,
            mobile: newUser.mobile,
            role: newUser.role,
            companyId: newUser.companyId,
        });
    }
}
