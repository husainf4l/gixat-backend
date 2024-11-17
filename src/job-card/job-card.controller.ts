import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { JobCardService } from './job-card.service';
import { Prisma } from '@prisma/client';

@Controller('job-cards')
export class JobCardController {
    constructor(private readonly jobCardService: JobCardService) { }

    @Get('clients')
    async getClients() {
        return this.jobCardService.getClients();
    }

    @Get('inventory')
    async getInventory() {
        return this.jobCardService.getInventory();
    }


    @Post()
    async createJobCard(@Body() data: Prisma.JobCardCreateInput) {
        try {
            return await this.jobCardService.createJobCard(data);
        } catch (error) {
            throw new Error(`Error creating job card: ${error.message}`);
        }
    }


    @Get()
    async getAllJobCards() {
        return this.jobCardService.getAllJobCards();
    }

    @Get('boards/:companyId')
    async getAllBoards(
        @Param('companyId') companyId: string,
    ) {
        return this.jobCardService.getBoards(companyId);
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
