// src/account/account.controller.ts

import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { Prisma, AccountType } from '@prisma/client';
import { AccountService } from 'src/account/account.service';

@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) { }

    // Create a new "client" account under Accounts Receivable
    @Post('client')
    async createClientAccount(@Body() data: Prisma.AccountReceivableCreateInput) {
        return this.accountService.createClient(data);
    }

    // Get all client accounts (under Accounts Receivable)
    @Get('clients')
    async getAllClients() {
        return this.accountService.findAllClients();
    }

    // Paginated list of client accounts
    @Get('clients/limit')
    async findAllClientsL(
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ) {
        return this.accountService.findAllClientsL({ page: Number(page), limit: Number(limit) });
    }

    // Search for clients by name or other fields
    @Get('clients/search')
    async searchClients(@Query('q') query: string) {
        return this.accountService.searchClients(query);
    }

    // Get a client account by ID
    @Get('client/:id')
    async findClientById(@Param('id') id: string) {
        return this.accountService.findClientById(id);
    }

    // Update a client account by ID
    @Patch('client/:id')
    async updateClientAccount(@Param('id') id: string, @Body() updateData: Prisma.ChartOfAccountUpdateInput) {
        return this.accountService.updateAccount(id, updateData);
    }

    // Delete a client account by ID
    @Delete('client/:id')
    async deleteClientAccount(@Param('id') id: string) {
        return this.accountService.deleteAccount(id);
    }
}
