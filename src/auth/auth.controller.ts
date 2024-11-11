import { Controller, Post, Body, UnauthorizedException, Get, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { UserService } from 'src/user/user.service';

interface LoginRequest {
    mobile: string;
    password: string;
}

export interface SignupRequest {
    name: string;
    mobile: string;
    password: string;
    role: 'EMPLOYEE' | 'ADMIN';
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
    ) { }

    // Login method: Authenticates the user and issues an access token
    @Post('login')
    async login(@Body() req: LoginRequest) {
        const user = await this.authService.validateUser(req.mobile, req.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);  // Return the token response
    }

    // Verify token method: Validates the provided JWT token
    @Get('verify-token')
    async verifyToken(@Req() req: ExpressRequest, @Res() res: ExpressResponse) {
        const token = req.headers.authorization?.split(' ')[1]; // Extract token from the Authorization header

        if (!token) {
            throw new HttpException('Token not provided', HttpStatus.BAD_REQUEST);
        }

        try {
            // Verify the token
            const isValid = await this.authService.verifyToken(token);
            if (isValid) {
                res.status(HttpStatus.OK).json({ valid: true });
            } else {
                res.status(HttpStatus.UNAUTHORIZED).json({ valid: false });
            }
        } catch (error) {
            console.error('Token verification failed:', error);
            throw new HttpException('Token verification failed', HttpStatus.UNAUTHORIZED);
        }
    }


    @Post('signup')
    async signup(@Body() req: SignupRequest) {
        return this.authService.signup(req);
    }


}
