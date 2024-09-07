import { IsNotEmpty, IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(10, { message: 'Mobile number must be at least 10 characters long' })
    mobile: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @IsNotEmpty()
    @IsEnum(UserRole)
    role: UserRole;

    @IsOptional()
    @IsString()
    name?: string;
}
