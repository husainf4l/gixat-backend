import { IsString, IsNotEmpty, IsMobilePhone, MinLength } from 'class-validator';

export class SignupRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsMobilePhone()
    @IsNotEmpty()
    mobile: string;

    @IsString()
    @MinLength(6) // Minimum password length
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    role: string;
}

export class LoginRequest {
    @IsMobilePhone()
    @IsNotEmpty()
    mobile: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
