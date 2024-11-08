import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CarStatus, Prisma } from '@prisma/client';
import { create } from 'domain';

@Injectable()
export class CarService {
    constructor(private prisma: PrismaService) { }

    // Create a car
    async createCar(data: Prisma.CarCreateInput) {
        return this.prisma.car.create({ data });
    }

    async findAllMakes() {
        return this.prisma.make.findMany({
            include: { models: true },
        });
    }

    async findAllCars() {
        return this.prisma.car.findMany({

        });
    }


    async findAllCarsL({ page, limit }: { page: number; limit: number }) {
        const skip = (page - 1) * limit;

        const cars = await this.prisma.car.findMany({
            skip,
            take: limit,
            include: {
                make: true, // Include full `Make` details
                model: true, // Include full `Model` details
                client: true, // Include full `Client` details if needed
                jobCards: true

            },
        });

        const totalClients = await this.prisma.car.count(); // Get the total number of clients

        return {
            data: cars,
            totalClients,
            currentPage: page,
            totalPages: Math.ceil(totalClients / limit),
        };
    }


    async updateCarStatus(carId: string, newStatus: CarStatus) {
        // Check if the car exists
        const car = await this.prisma.car.findUnique({
            where: { id: carId },
        });

        if (!car) {
            throw new NotFoundException(`Car with ID ${carId} not found`);
        }
        return this.prisma.car.update({
            where: { id: carId },
            data: { status: newStatus },
        });
    }



    // Get all cars for a specific client
    async getCarsByClient(clientId: string) {
        return this.prisma.car.findMany({
            where: { clientId },
        });
    }
    // Get a specific car by its ID
    async getCarById(carId: string) {
        return this.prisma.car.findUnique({
            where: { id: carId },
        });
    }

    // Delete a car
    async deleteCar(carId: string) {
        return this.prisma.car.delete({
            where: { id: carId },
        });
    }
}
