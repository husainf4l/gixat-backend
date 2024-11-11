import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'; // Import jsonwebtoken
import { SignupRequest } from './auth.controller';

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
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { mobile: user.mobile, sub: user.id, role: user.role };
        const token = this.jwtService.sign(payload);
        return { access_token: token };
    }

    async verifyToken(token: string): Promise<boolean> {
        try {
            jwt.verify(token, this.secret);
            return true;
        } catch (error) {
            console.error('Token verification failed:', error);
            return false;
        }
    }


    async signup(user: SignupRequest) {
        const payload = { name: user.name, mobile: user.mobile, role: user.role, password: user.password };

        // Check if the user already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { mobile: payload.mobile },
        });

        if (existingUser) {
            throw new HttpException('User already exists with this mobile number', HttpStatus.BAD_REQUEST);
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(payload.password, 10);

        // Create the new user in the database
        const newUser = await this.prisma.user.create({
            data: {
                name: payload.name,
                mobile: payload.mobile,
                password: hashedPassword,
                role: payload.role,
            },
        });

        return this.login(newUser);
    }


}