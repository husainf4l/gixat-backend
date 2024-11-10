import { Module } from '@nestjs/common';
import { AccountPayableService } from './account-payable.service';
import { AccountPayableController } from './account-payable.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AccountPayableService, PrismaService],

  controllers: [AccountPayableController]
})
export class AccountPayableModule { }
