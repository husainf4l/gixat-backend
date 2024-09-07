import { Controller, Post, Body, Request, UnauthorizedException, Get, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

interface LoginRequest {
    mobile: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() req: LoginRequest) {
        const user = await this.authService.validateUser(req.mobile, req.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Get('verify-token')
    async verifyToken(@Req() req: ExpressRequest, @Res() res: ExpressResponse) {
        try {
            const token = req.headers.authorization?.split(' ')[1]; // Extract the token
            if (token && await this.authService.verifyToken(token)) {
                res.status(HttpStatus.OK).json(true);
            } else {
                res.status(HttpStatus.UNAUTHORIZED).json(false);
            }
        } catch (error) {
            console.error('Error in verifyToken:', error);
            throw new HttpException('Token verification failed', HttpStatus.UNAUTHORIZED);
        }
    }
}
