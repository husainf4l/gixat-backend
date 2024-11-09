import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, JobCard } from '@prisma/client';

@Injectable()
export class JobCardService {
    constructor(private prisma: PrismaService) { }

    async getAllJobCards(): Promise<JobCard[]> {
        return this.prisma.jobCard.findMany();
    }

    async createJobCard(data: Prisma.JobCardCreateInput): Promise<JobCard> {
        return this.prisma.jobCard.create({ data });
    }

    async updateJobCard(id: string, data: Prisma.JobCardUpdateInput): Promise<JobCard> {
        return this.prisma.jobCard.update({ where: { id }, data });
    }

    async deleteJobCard(id: string): Promise<JobCard> {
        return this.prisma.jobCard.delete({ where: { id } });
    }
}
