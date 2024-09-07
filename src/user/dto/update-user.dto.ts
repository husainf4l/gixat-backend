import { IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { UserRole } from '@prisma/client';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(10, { message: 'Mobile number must be at least 10 characters long' })
    mobile?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}
