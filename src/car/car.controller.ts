import { Controller, Post, Body, Get, Param, Delete, Query, Put } from '@nestjs/common';
import { CarService } from './car.service';
import { CarStatus, Prisma } from '@prisma/client';

@Controller('cars')
export class CarController {
    constructor(private readonly carService: CarService) { }

    @Post()
    async createCar(@Body() createCarDto: Prisma.CarCreateInput) {
        return this.carService.createCar(createCarDto);
    }


    @Get()
    async getAllCars() {
        return this.carService.findAllCars();
    }

    @Get('/makes')
    async getAllMakes() {
        return this.carService.findAllMakes();
    }

    @Get('limit')
    async findAllCarL(
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        return this.carService.findAllCarsL({ page: Number(page), limit: Number(limit) });
    }

    @Put(':carId/status')
    async updateCarStatus(
        @Param('carId') carId: string,
        @Body('status') newStatus: CarStatus
    ) {
        return this.carService.updateCarStatus(carId, newStatus);
    }

    // Get all cars by client ID
    @Get('/client/:clientId')
    async getCarsByClient(@Param('clientId') clientId: string) {
        return this.carService.getCarsByClient(clientId);
    }

    // Get a specific car by car ID
    @Get('/:id')
    async getCarById(@Param('id') carId: string) {
        return this.carService.getCarById(carId);
    }

    @Delete('/:id')
    async deleteCar(@Param('id') carId: string) {
        return this.carService.deleteCar(carId);
    }
}
