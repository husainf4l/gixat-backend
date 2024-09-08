import { IsInt, IsString, IsOptional, IsNotEmpty, Min, MaxLength } from 'class-validator';

export class CreateCarDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    make: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    model: string;

    @IsInt()
    @Min(1886)
    year: number;

    @IsString()
    @IsNotEmpty()
    vin: string;

    @IsString()
    @IsNotEmpty()
    licensePlate: string;

    @IsString()
    @IsNotEmpty()
    barcode: string; // Add barcode field

    @IsInt()
    @IsNotEmpty()
    clientId: number;
}
