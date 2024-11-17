import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, JobCard, BoardStatus, } from '@prisma/client';

@Injectable()
export class JobCardService {
    constructor(private prisma: PrismaService) { }

    async getClients() {
        return this.prisma.accountReceivable.findMany({
            include: {
                Car: {
                    include: {
                        model: true,
                        make: true
                    }
                }
            }
        })
    }

    async getInventory() {
        return this.prisma.inventoryItem.findMany({

        })
    }

    async getBoards(companyId: string): Promise<BoardStatus[]> {
        return this.prisma.boardStatus.findMany({
            where: { companyId },
            orderBy: { priority: 'asc' },
            include: {
                jobCards: {
                    select: {

                        car: {
                            select: {
                                make: true,
                                model: true,
                                year: true,
                            },
                        },
                    },
                },
            },
        });
    }


    async getAllJobCards(): Promise<JobCard[]> {
        return this.prisma.jobCard.findMany();
    }

    async createJobCard(data: Prisma.JobCardCreateInput): Promise<JobCard> {
        return this.prisma.jobCard.create({
            data: {
                ...data,
                date: new Date(data.date)
            }
        });
    }

    async updateJobCard(id: string, data: Prisma.JobCardUpdateInput): Promise<JobCard> {
        return this.prisma.jobCard.update({ where: { id }, data });
    }

    async deleteJobCard(id: string): Promise<JobCard> {
        return this.prisma.jobCard.delete({ where: { id } });
    }
}
