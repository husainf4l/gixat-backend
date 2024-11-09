import { Module } from '@nestjs/common';
import { ChartOfAccountService } from './chart-of-account.service';
import { ChartOfAccountController } from './chart-of-account.controller';

@Module({
  providers: [ChartOfAccountService],
  controllers: [ChartOfAccountController]
})
export class ChartOfAccountModule {}
