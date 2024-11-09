import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { JobCardService } from './job-card.service';
import { Prisma } from '@prisma/client';

@Controller('job-cards')
export class JobCardController {
    constructor(private readonly jobCardService: JobCardService) { }

    @Get()
    async getAllJobCards() {
        return this.jobCardService.getAllJobCards();
    }

    @Post()
    async createJobCard(@Body() data: Prisma.JobCardCreateInput) {
        return this.jobCardService.createJobCard(data);
    }

    @Put(':id')
    async updateJobCard(@Param('id') id: string, @Body() data: Prisma.JobCardUpdateInput) {
        return this.jobCardService.updateJobCard(id, data);
    }

    @Delete(':id')
    async deleteJobCard(@Param('id') id: string) {
        return this.jobCardService.deleteJobCard(id);
    }
}
