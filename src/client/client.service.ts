// src/client/client.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming PrismaService is already set up
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';

@Injectable()
export class ClientService {
    constructor(private prisma: PrismaService) { }

    async createClient(createClientDto: CreateClientDto) {
        return this.prisma.client.create({
            data: createClientDto,
        });
    }

    async findAllClients() {
        return this.prisma.client.findMany({
            include: {
                cars: true, // Include the related cars for each client
            },
        });
    }


    async findClientById(id: number) {
        return this.prisma.client.findUnique({
            where: { id },
        });
    }

    async updateClient(id: number, updateClientDto: UpdateClientDto) {
        return this.prisma.client.update({
            where: { id },
            data: updateClientDto,
        });
    }

    async deleteClient(id: number) {
        return this.prisma.client.delete({
            where: { id },
        });
    }
}
