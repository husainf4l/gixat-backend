import { Controller, Post, Body, UnauthorizedException, Get, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { LoginRequest, SignupRequest } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // Login method: Authenticates the user and issues an access token
    @Post('login')
    async login(@Body() req: LoginRequest) {
        const user = await this.authService.validateUser(req.mobile, req.password);
        return this.authService.login(user); // Pass validated user directly to login
    }

    // Verify token method: Validates the provided JWT token
    @Get('verify-token')
    async verifyToken(@Req() req: ExpressRequest, @Res() res: ExpressResponse) {
        const token = req.headers.authorization?.split(' ')[1]; // Extract token from the Authorization header

        if (!token) {
            throw new HttpException('Token not provided', HttpStatus.BAD_REQUEST);
        }

        try {
            const decoded = await this.authService.verifyToken(token);
            res.status(HttpStatus.OK).json({ valid: true, decoded });
        } catch (error) {
            console.error('Token verification failed:', error);
            res.status(HttpStatus.UNAUTHORIZED).json({ valid: false, message: error.message });
        }
    }

    @Post('signup')
    async signup(@Body() req: SignupRequest) {
        return this.authService.signup(req);
    }
}
