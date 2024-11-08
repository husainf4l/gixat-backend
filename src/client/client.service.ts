// src/client/client.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming PrismaService is already set up
import { Prisma } from '@prisma/client';
import { connect } from 'http2';

@Injectable()
export class ClientService {
    constructor(private prisma: PrismaService) { }

    async createClient(data: Prisma.ClientCreateInput) {
        return this.prisma.client.create({
            data
        });
    }

    async searchClients(query: string) {
        return this.prisma.client.findMany({
            where: {
                OR: [
                    { firstName: { contains: query, mode: 'insensitive' } },
                    { lastName: { contains: query, mode: 'insensitive' } },
                    { phoneNumber: { contains: query } }
                ]
            },
            include: {
                cars: true,
                address: true
            }
        });
    }

    async findAllClientsL({ page, limit }: { page: number; limit: number }) {
        const skip = (page - 1) * limit; // Calculate the offset

        const clients = await this.prisma.client.findMany({
            skip,
            take: limit,
            include: {
                cars: true,
                address: true
            },
        });

        const totalClients = await this.prisma.client.count(); // Get the total number of clients

        return {
            data: clients,
            totalClients,
            currentPage: page,
            totalPages: Math.ceil(totalClients / limit),
        };
    }


    async findAllClients() {
        return this.prisma.client.findMany();
    }


    async findClientById(id: string) {
        return this.prisma.client.findUnique({
            where: { id },
        });
    }

    async updateClient(id: string, updateClient: Prisma.ClientUpdateInput) {
        return this.prisma.client.update({
            where: { id },
            data: updateClient,
        });
    }

    async deleteClient(id: string) {
        return this.prisma.client.delete({
            where: { id },
        });
    }
}
