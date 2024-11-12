import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './car/car.module';
import { BulkModule } from './bulk/bulk.module';
import { InventoryModule } from './inventory/inventory.module';
import { AccountService } from './account/account.service';
import { AccountModule } from './account/account.module';
import { JobCardModule } from './job-card/job-card.module';
import { JournalModule } from './journal/journal.module';
import { JournalController } from './journal/journal.controller';
import { JournalService } from './journal/journal.service';
import { JobCardController } from './job-card/job-card.controller';
import { JobCardService } from './job-card/job-card.service';
import { ChartOfAccountsModule } from './chart-of-accounts/chart-of-accounts.module';
import { AccountReceivableModule } from './account-receivable/account-receivable.module';
import { CatgoryModule } from './catgory/catgory.module';
import { AccountPayableModule } from './account-payable/account-payable.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { QuickbooksModule } from './quickbooks/quickbooks.module';
import { KanbanModule } from './kanban/kanban.module';

@Module({
  imports: [
    AuthModule, ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    CarModule,
    BulkModule,
    InventoryModule,
    JournalModule,
    JobCardModule,
    AccountModule,
    ChartOfAccountsModule,
    AccountReceivableModule,
    CatgoryModule,
    AccountPayableModule,
    DashboardModule,
    QuickbooksModule,
    KanbanModule,],
  controllers: [AppController, JobCardController, JournalController],
  providers: [AppService, JobCardService, JournalService, AccountService],
})
export class AppModule { }
