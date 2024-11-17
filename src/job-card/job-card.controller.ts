import { Controller, Get, Post, Put, Delete, Param, Body, UnauthorizedException } from '@nestjs/common';
import { JobCardService } from './job-card.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { Headers } from '@nestjs/common';


@Controller('job-cards')
export class JobCardController {
    constructor(private readonly jobCardService: JobCardService, private readonly jwtService: JwtService    ) { }

    @Get('clients')
    async getClients(@Headers('authorization') token?: string) {
        // Extract and decode the token
      if (!token) {
        throw new UnauthorizedException('Token is required');
      }
  
      // Remove "Bearer " if present
      const accessToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
  
      try {
        const decoded = this.jwtService.verify(accessToken, { secret: process.env.JWT_SECRET });
  
        // Extract companyId from the decoded token
        const { companyId } = decoded;
  
        if (!companyId) {
          throw new UnauthorizedException('Invalid token: companyId missing');
        }
  
        // Fetch and return clients for the company
        return this.jobCardService.getClients(companyId);
      } catch (error) {
        console.error('Token verification failed:', error);
        throw new UnauthorizedException('Invalid or expired token');
      }
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
