// chart-of-accounts.service.ts
import { Injectable } from '@nestjs/common';
import { AccountClassification, AccountType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChartOfAccountsService {
  constructor(private prisma: PrismaService) {}

  private accountNumberPrefix = {
    [AccountClassification.ASSET]: '1',
    [AccountClassification.LIABILITY]: '2',
    [AccountClassification.EQUITY]: '3',
    [AccountClassification.REVENUE]: '4',
    [AccountClassification.EXPENSE]: '5',
  };

  private accountTypeSuffix = {
    [AccountType.CURRENT_ASSET]: '100000',
    [AccountType.FIXED_ASSET]: '200000',
    [AccountType.CURRENT_LIABILITY]: '100000',
    [AccountType.LONG_TERM_LIABILITY]: '200000',
    [AccountType.EQUITY]: '000000',
    [AccountType.REVENUE]: '000000',
    [AccountType.EXPENSE]: '000000',
    [AccountType.COST_OF_GOODS_SOLD]: '500000',
    [AccountType.OTHER_INCOME]: '000000',
    [AccountType.OTHER_EXPENSE]: '000000',
  };

  async initializeDefaultAccounts() {
    const defaultAccounts = [
      { name: 'Assets', classification: AccountClassification.ASSET, accountType: AccountType.CURRENT_ASSET },
      { name: 'Accounts Receivable', classification: AccountClassification.ASSET, accountType: AccountType.CURRENT_ASSET, parentAccountName: 'Assets' },
      { name: 'Inventory', classification: AccountClassification.ASSET, accountType: AccountType.CURRENT_ASSET, parentAccountName: 'Assets' },
      { name: 'Fixed Assets', classification: AccountClassification.ASSET, accountType: AccountType.FIXED_ASSET, parentAccountName: 'Assets' },
      
      { name: 'Liabilities', classification: AccountClassification.LIABILITY, accountType: AccountType.CURRENT_LIABILITY },
      { name: 'Accounts Payable', classification: AccountClassification.LIABILITY, accountType: AccountType.CURRENT_LIABILITY, parentAccountName: 'Liabilities' },
      { name: 'Taxes Payable', classification: AccountClassification.LIABILITY, accountType: AccountType.CURRENT_LIABILITY, parentAccountName: 'Liabilities' },
      
      { name: 'Equity', classification: AccountClassification.EQUITY, accountType: AccountType.EQUITY },
      { name: 'Owner’s Equity', classification: AccountClassification.EQUITY, accountType: AccountType.EQUITY, parentAccountName: 'Equity' },
      
      { name: 'Revenue', classification: AccountClassification.REVENUE, accountType: AccountType.REVENUE },
      { name: 'Sales Revenue', classification: AccountClassification.REVENUE, accountType: AccountType.REVENUE, parentAccountName: 'Revenue' },
      
      { name: 'Expenses', classification: AccountClassification.EXPENSE, accountType: AccountType.EXPENSE },
      { name: 'Cost of Goods Sold', classification: AccountClassification.EXPENSE, accountType: AccountType.COST_OF_GOODS_SOLD, parentAccountName: 'Expenses' },
      { name: 'Tax Expense', classification: AccountClassification.EXPENSE, accountType: AccountType.EXPENSE, parentAccountName: 'Expenses' },
    ];

    for (const account of defaultAccounts) {
      await this.createAccountIfNotExists(account);
    }
  }

  private async createAccountIfNotExists(accountData) {
    const { name, classification, accountType, parentAccountName } = accountData;

    // Check if the account already exists
    const existingAccount = await this.prisma.chartOfAccount.findUnique({
      where: { name },
    });

    if (!existingAccount) {
      let parentAccountId = null;
      if (parentAccountName) {
        const parentAccount = await this.prisma.chartOfAccount.findUnique({
          where: { name: parentAccountName },
        });
        if (parentAccount) parentAccountId = parentAccount.id;
      }

      // Generate a unique account number
      const accountNumber = await this.generateAccountNumber(classification, accountType);

      // Create the account
      await this.prisma.chartOfAccount.create({
        data: {
          name,
          classification,
          accountType,
          accountNumber,
          parentAccountId,
        },
      });
    }
  }

  private async generateAccountNumber(classification: AccountClassification, accountType: AccountType): Promise<string> {
    const prefix = this.accountNumberPrefix[classification];
    const suffix = this.accountTypeSuffix[accountType];
    
    // Base account number format (e.g., "110000" for Accounts Receivable under Assets)
    let baseAccountNumber = prefix + suffix;

    // Find the maximum existing account number that starts with this base prefix
    const existingAccounts = await this.prisma.chartOfAccount.findMany({
      where: {
        accountNumber: {
          startsWith: baseAccountNumber,
        },
      },
      orderBy: {
        accountNumber: 'desc',
      },
      take: 1,
    });

    if (existingAccounts.length > 0) {
      // Increment the numeric part of the account number to create a unique number
      const lastAccountNumber = existingAccounts[0].accountNumber;
      const increment = parseInt(lastAccountNumber.slice(-3), 10) + 1;
      return baseAccountNumber + increment.toString().padStart(3, '0'); // e.g., "110000001", "110000002"
    } else {
      // Start with "001" if no other accounts exist with this prefix
      return baseAccountNumber + '001';
    }
  }

  async getAllAccounts() {
    return this.prisma.chartOfAccount.findMany({
      orderBy: { classification: 'asc' },
    });
  }

  async getAccountsGroupedByClassification() {
    const accounts = await this.getAllAccounts();
    const groupedAccounts = {};

    // Group accounts by classification
    accounts.forEach(account => {
      if (!groupedAccounts[account.classification]) {
        groupedAccounts[account.classification] = [];
      }
      groupedAccounts[account.classification].push(account);
    });

    return groupedAccounts;
  }
}
