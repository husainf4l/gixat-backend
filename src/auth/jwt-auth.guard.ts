import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info, context) {
        console.log('AuthGuard - User:', user);  // Debugging log
        console.log('AuthGuard - Info:', info);  // Debugging log
        console.log('AuthGuard - Error:', err);  // Debugging log
        return super.handleRequest(err, user, info, context);
    }
}
