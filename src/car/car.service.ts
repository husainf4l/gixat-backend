import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CarService {
    constructor(private readonly prisma: PrismaService) { }

    // Create a new car entry
    async createCar(data: Prisma.CarCreateInput) {
        return this.prisma.car.create({
            data,
            include: {
                model: true,
                make: true,
            }
        });
    }

    // Retrieve all car makes, including their models
    async findAllMakes() {
        return this.prisma.make.findMany({
            include: { models: true },
        });
    }

    // Retrieve all cars with optional expanded details
    async findAllCars() {
        return this.prisma.car.findMany({
            include: {
                make: true,
                model: true,
                clientAccount: true, // Include the client’s account details (if applicable)
                jobCards: true,      // Include related job cards
            },
        });
    }

    async findAllCarsL({ page, limit }: { page: number; limit: number }) {
        const skip = (page - 1) * limit;
        const cars = await this.prisma.car.findMany({
            skip: skip,
            take: parseInt(limit.toString(), 10),  // Ensures the value is an integer
            include: {
                make: true,
                model: true,
                clientAccount: true,
                jobCards: true,
            },
        });

        const totalCars = await this.prisma.car.count();

        return {
            data: cars,
            total: totalCars,
            currentPage: page,
            totalPages: Math.ceil(totalCars / limit),
        };
    }



    // Update the status of a car
    async updateCarStatus(jobCardId: string) {
        const jobCard = await this.prisma.jobCard.findUnique({
            where: { id: jobCardId },
        });

        if (!jobCard) {
            throw new NotFoundException(`Car with ID ${jobCard} not found`);
        }


    }

    // Retrieve all cars associated with a specific client account
    async getCarsByClient(clientAccountId: string) {
        return this.prisma.car.findFirst({
            where: { clientAccountId },
            include: {
                make: true,
                model: true,
                jobCards: true,
            },
        });
    }

    // Retrieve a specific car by its ID
    async getCarById(carId: string) {
        return this.prisma.car.findUnique({
            where: { id: carId },
            include: {
                make: true,
                model: true,
                jobCards: true,
                clientAccount: true,
            },
        });
    }

    // Delete a car by its ID
    async deleteCar(carId: string) {
        return this.prisma.car.delete({
            where: { id: carId },
        });
    }
}
