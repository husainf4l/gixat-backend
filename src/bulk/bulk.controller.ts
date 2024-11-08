import { Body, Controller, Post } from '@nestjs/common';
import { CarService } from 'src/car/car.service';
import { CreateMakeModelDto } from './dto/create-make-model';
import { BulkService } from './bulk.service';

@Controller('bulk')
export class BulkController {
    constructor(private readonly bulckService: BulkService) { }

    @Post('makesAndModels')
    async addMakesAndModels(@Body() makesAndModels: CreateMakeModelDto[]) {
        return this.bulckService.bulkCreateMakesAndModels(makesAndModels);
    }

}
