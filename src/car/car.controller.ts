import { Controller, Post, Body, Get, Param, Delete, Query, Put } from '@nestjs/common';
import { CarService } from './car.service';
import { Prisma } from '@prisma/client';

@Controller('cars')
export class CarController {
    constructor(private readonly carService: CarService) { }

    // Create a new car
    @Post()
    async createCar(@Body() createCarDto: Prisma.CarCreateInput) {
        return this.carService.createCar(createCarDto);
    }

    // Get all cars
    @Get()
    async getAllCars() {
        return this.carService.findAllCars();
    }

    // Get all car makes
    @Get('/makes')
    async getAllMakes() {
        return this.carService.findAllMakes();
    }



    // Get paginated cars
    @Get('/paginate')
    async findAllCarsPaginated(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        return this.carService.findAllCarsL({ page, limit });
    }

    // Update the status of a specific car
    @Put(':carId/status')
    async updateCarStatus(
        @Param('carId') carId: string,
        @Body('status') newStatus: any
    ) {
        return this.carService.updateCarStatus(carId);
    }

    // Get all cars associated with a specific client account ID
    @Get('/client/:clientAccountId')
    async getCarsByClient(@Param('clientAccountId') clientAccountId: string) {
        return this.carService.getCarsByClient(clientAccountId);
    }

    // Get a specific car by car ID
    @Get('/:id')
    async getCarById(@Param('id') carId: string) {
        return this.carService.getCarById(carId);
    }

    // Delete a specific car by car ID
    @Delete('/:id')
    async deleteCar(@Param('id') carId: string) {
        return this.carService.deleteCar(carId);
    }
}
