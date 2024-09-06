import { IsOptional, IsString, IsMobilePhone, MinLength, Matches } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsMobilePhone()
    mobile?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, { message: 'Password is too weak' })
    password?: string;
}
