import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {
        const secret = this.configService.get<string>('JWT_SECRET');
        console.log('JWT Secret in AuthService:', secret);  // Print the JWT Secret for debugging
    }

    async validateUser(mobile: string, pass: string): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { mobile } });
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            console.log('User validated:', result);  // Debugging log
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { mobile: user.mobile, sub: user.id, role: user.role };
        console.log('Generating JWT for user:', payload);  // Debugging log
        const token = this.jwtService.sign(payload);
        console.log('Generated Token:', token);  // Debugging log
        return { access_token: token };
    }

}
