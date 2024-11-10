import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AccountReceivableService } from './account-receivable.service';
import { Prisma } from '@prisma/client';

@Controller('account-receivable')
export class AccountReceivableController {
  constructor(private readonly accountReceivableService: AccountReceivableService) {}

  @Post('create')
  async createAccountReceivable(@Body() data: {
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
    return this.accountReceivableService.createAccountReceivable(data);
  }

  @Get('clients')
  async getAllClients() {
      return this.accountReceivableService.findAllClients();
  }

  // Paginated list of client accounts
  @Get('clients/limit')
  async findAllClientsL(
      @Query('page') page = 1,
      @Query('limit') limit = 10
  ) {
      return this.accountReceivableService.findAllClientsL({ page: Number(page), limit: Number(limit) });
  }

  // Search for clients by name or other fields
  @Get('clients/search')
  async searchClients(@Query('q') query: string) {
      return this.accountReceivableService.searchClients(query);
  }

  // Get a client account by ID
  @Get('client/:id')
  async findClientById(@Param('id') id: string) {
      return this.accountReceivableService.findClientById(id);
  }

  // Update a client account by ID
  @Patch('client/:id')
  async updateClientAccount(@Param('id') id: string, @Body() updateData: Prisma.ChartOfAccountUpdateInput) {
      return this.accountReceivableService.updateAccount(id, updateData);
  }

  // Delete a client account by ID
  @Delete('client/:id')
  async deleteClientAccount(@Param('id') id: string) {
      return this.accountReceivableService.deleteAccount(id);
  }

}
