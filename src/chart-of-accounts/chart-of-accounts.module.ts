import { Module } from '@nestjs/common';
import { ChartOfAccountsService } from './chart-of-accounts.service';
import { ChartOfAccountsController } from './chart-of-accounts.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ChartOfAccountsService, PrismaService],
  controllers: [ChartOfAccountsController]
})
export class ChartOfAccountsModule {}
