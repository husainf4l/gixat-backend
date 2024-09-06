import { IsNotEmpty, IsOptional, IsString, IsEnum, IsMobilePhone, MinLength, Matches } from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
    @IsNotEmpty()
    @IsMobilePhone()  // Ensure it's a valid mobile phone number
    mobile: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)  // Minimum length of 8 characters
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, { message: 'Password is too weak' })  // Ensure strong password with numbers, uppercase, lowercase, and special chars
    password: string;

    @IsEnum(UserRole)
    role: UserRole;
}
