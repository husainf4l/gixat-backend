// src/account/account.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, AccountType } from '@prisma/client';

@Injectable()
export class AccountService {
    constructor(private prisma: PrismaService) { }

    // Create a new client account (under Accounts Receivable)
    async createClient(data: Prisma.AccountReceivableCreateInput) {
        return this.prisma.accountReceivable.create({
            data,
        });
    }


    // Get all client accounts under Accounts Receivable
    async findAllClients() {
        return this.prisma.accountReceivable.findMany({
        });
    }

    // Get paginated list of client accounts
    async findAllClientsL({ page, limit }: { page: number; limit: number }) {
        const skip = (page - 1) * limit;
        const clients = await this.prisma.accountReceivable.findMany({
            skip,
            take: limit,
        });
        const totalClients = await this.prisma.accountReceivable.count({
        });

        return {
            data: clients,
            total: totalClients,
            currentPage: page,
            totalPages: Math.ceil(totalClients / limit),
        };
    }

    // Search for client accounts by query
    async searchClients(query: string) {
        return this.prisma.accountReceivable.findMany({
            where: {
                OR: [
                    { clientName: { contains: query, mode: 'insensitive' } },
                    { phoneNumber: { contains: query, mode: 'insensitive' } },
                ],
            },
        });
    }

    // Get a client account by ID
    async findClientById(id: string) {
        return this.prisma.chartOfAccount.findUnique({ where: { id } });
    }

    // Update a client account by ID
    async updateAccount(id: string, data: Prisma.ChartOfAccountUpdateInput) {
        return this.prisma.chartOfAccount.update({
            where: { id },
            data,
        });
    }

    // Delete a client account by ID
    async deleteAccount(id: string) {
        return this.prisma.chartOfAccount.delete({
            where: { id },
        });
    }
}
