import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
export class CarController {
    constructor(private readonly carService: CarService) { }

    // Create a new car
    @Post()
    async createCar(@Body() createCarDto: CreateCarDto) {
        return this.carService.createCar(createCarDto);
    }

    // Get all cars by client ID
    @Get('/client/:clientId')
    async getCarsByClient(@Param('clientId') clientId: number) {
        return this.carService.getCarsByClient(clientId);
    }

    // Get a specific car by car ID
    @Get('/:id')
    async getCarById(@Param('id') carId: number) {
        return this.carService.getCarById(carId);
    }

    // Delete a car by its ID
    @Delete('/:id')
    async deleteCar(@Param('id') carId: number) {
        return this.carService.deleteCar(carId);
    }
}
