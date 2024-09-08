// src/client/dto/client.dto.ts

import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    mobile: string;

    @IsString()
    @IsOptional()
    address?: string;
}

export class UpdateClientDto {
    @IsString()
    @IsOptional()
    mobile?: string;

    @IsString()
    @IsOptional()
    address?: string;
}
