import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarService {
    constructor(private prisma: PrismaService) { }

    // Create a car
    async createCar(createCarDto: CreateCarDto) {
        const { make, model, year, vin, licensePlate, clientId, barcode, // Add the barcode field here
        } = createCarDto;

        return this.prisma.car.create({
            data: {
                make,
                model,
                year,
                vin,
                licensePlate,
                barcode, // Add the barcode field here
                client: { connect: { id: clientId } }, // Connect to the client
            },
        });
    }

    // Get all cars for a specific client
    async getCarsByClient(clientId: number) {
        return this.prisma.car.findMany({
            where: { clientId },
        });
    }

    // Get a specific car by its ID
    async getCarById(carId: number) {
        return this.prisma.car.findUnique({
            where: { id: carId },
        });
    }

    // Delete a car
    async deleteCar(carId: number) {
        return this.prisma.car.delete({
            where: { id: carId },
        });
    }
}
