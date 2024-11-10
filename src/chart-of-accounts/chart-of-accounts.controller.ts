// chart-of-accounts.controller.ts
import { Controller, Get, Post } from '@nestjs/common';
import { ChartOfAccountsService } from './chart-of-accounts.service';

@Controller('chart-of-accounts')
export class ChartOfAccountsController {
  constructor(private readonly chartOfAccountsService: ChartOfAccountsService) {}

  @Post('initialize')
  async initializeDefaultAccounts() {
    await this.chartOfAccountsService.initializeDefaultAccounts();
    return { message: 'Default accounts initialized successfully' };
  }

  @Get()
  async getAllAccounts() {
    const accounts = await this.chartOfAccountsService.getAllAccounts();
    return { accounts };
  }

  // Endpoint to get accounts grouped by classification
  @Get('grouped')
  async getAccountsGroupedByClassification() {
    const groupedAccounts = await this.chartOfAccountsService.getAccountsGroupedByClassification();
    return { groupedAccounts };
  }

}
