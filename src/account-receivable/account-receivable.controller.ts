import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UnauthorizedException } from '@nestjs/common';
import { AccountReceivableService } from './account-receivable.service';
import { Prisma } from '@prisma/client';
import { Headers } from '@nestjs/common';
import { UserService } from 'src/user/user.service';


@Controller('account-receivable')
export class AccountReceivableController {
  constructor(private readonly accountReceivableService: AccountReceivableService, private userService: UserService) { }


  @Post('create')
  async createAccountReceivable(
    @Headers('authorization') token: string,
    @Body() data: {
      clientName: string;
      companyName?: string;
      taxId?: string;
      phoneNumber: string;
      email?: string;
      notes?: string;
      address?: {
        country?: string;
        city?: string;
        streetAddress?: string;
      };
    }
  ) {
    // Extract user from token
    const companyId = this.userService.getCompanyId(token);
    if (!companyId || !companyId) {
      throw new UnauthorizedException('Invalid token or user not found.');
    }

    return this.accountReceivableService.createAccountReceivable({ ...data, companyId });
  }



  @Get('clients')
  async getClients(@Headers('authorization') token?: string) {
    const user = this.userService.getUserFromToken(token);

    return this.accountReceivableService.findAllClients(
      { user: user }
    );

  }


  // Paginated list of client accounts
  @Get('clients/limit')
  async findAllClientsL(
    @Headers('authorization') token?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ) {
    const user = this.userService.getUserFromToken(token);
    return this.accountReceivableService.findAllClientsL({
      user: user,
      page: Number(page),
      limit: Number(limit),
    });
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
