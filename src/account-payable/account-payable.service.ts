import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client'; // Import Prisma client
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountPayableService {
    constructor(private prisma: PrismaService) { }

    // Create an AccountPayable
    async create(data: Prisma.AccountPayableCreateInput) {
        return await this.prisma.accountPayable.create({
            data,
        });
    }

    // Get all AccountPayables
    async findAll() {
        return this.prisma.accountPayable.findMany();
    }

    // Get one AccountPayable by ID
    async findOne(id: string) {
        return this.prisma.accountPayable.findUnique({
            where: { id },
        });
    }

    // Update an AccountPayable by ID
    async update(id: string, data: Prisma.AccountPayableUpdateInput) {
        return this.prisma.accountPayable.update({
            where: { id },
            data,
        });
    }

    // Delete an AccountPayable by ID
    async remove(id: string) {
        return this.prisma.accountPayable.delete({
            where: { id },
        });
    }
}
