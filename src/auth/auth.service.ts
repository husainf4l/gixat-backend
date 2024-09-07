import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'; // Import jsonwebtoken

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
}
