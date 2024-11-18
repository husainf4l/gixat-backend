import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountReceivableService {
  constructor(private prisma: PrismaService) { }

  async createAccountReceivable(data: {
    clientName: string;
    companyName?: string;
    taxId?: string;
    phoneNumber: string;
    email?: string;
    notes?: string;
    address: {
      country: string;
      city: string;
      streetAddress: string;
    };
  }) {
    // Step 1: Check if an AccountReceivable entry with the same phone number already exists
    const existingAccount = await this.prisma.accountReceivable.findUnique({
      where: { phoneNumber: data.phoneNumber },
    });

    if (existingAccount) {
      throw new BadRequestException('An account with this phone number already exists.');
    }

    // Step 2: Find the ChartOfAccount entry for "Accounts Receivable"
    const accountsReceivableAccount = await this.prisma.chartOfAccount.findFirst({
      where: { name: 'Accounts Receivable' },
    });

    if (!accountsReceivableAccount) {
      throw new Error("Accounts Receivable account not found in Chart of Accounts.");
    }

    // Step 3: Create the AccountReceivable entry
    return this.prisma.accountReceivable.create({
      data: {
        clientName: data.clientName,
        companyName: data.companyName,
        taxId: data.taxId,
        phoneNumber: data.phoneNumber,
        email: data.email,
        notes: data.notes,
        chartAccount: {
          connect: { id: accountsReceivableAccount.id }, // Connect to ChartOfAccount
        },
        address: {
          create: {
            country: data.address.country,
            city: data.address.city,
            street: data.address.streetAddress
          },
        },
      },
    });
  }




  async findAllClients({ user }: { user: User }) {
    return this.prisma.accountReceivable.findMany({

      where: { companyId: user.companyId },

      include: {
        address: true,
        Car: true
      }
    });
  }

  async findAllClientsL({ page, limit, user }: { page: number; limit: number; user: User }) {
    console.log(user.role)
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException('Access denied: Only admins can view all clients.');
    }


    const skip = (page - 1) * limit;
    const clients = await this.prisma.accountReceivable.findMany({
      where: { companyId: user.companyId },
      skip,
      take: limit,
      include: { address: true }
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
    return this.prisma.accountReceivable.findUnique({
      where: { id },
    });
  }

  // Update a client account by ID
  async updateAccount(id: string, data: Prisma.AccountReceivableUpdateInput) {
    return this.prisma.accountReceivable.update({
      where: { id },
      data,
    });
  }

  // Delete a client account by ID
  async deleteAccount(id: string) {
    return this.prisma.accountReceivable.delete({
      where: { id },
    });
  }

}
