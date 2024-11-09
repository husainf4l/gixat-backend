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
import { ChartOfAccountModule } from './chart-of-account/chart-of-account.module';
import { ChartOfAccountController } from './chart-of-account/chart-of-account.controller';
import { JobCardController } from './job-card/job-card.controller';
import { JobCardService } from './job-card/job-card.service';
import { ChartOfAccountService } from './chart-of-account/chart-of-account.service';

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
    ChartOfAccountModule,
    JournalModule,
    JobCardModule,
    AccountModule,],
  controllers: [AppController, ChartOfAccountController, JobCardController, JournalController],
  providers: [AppService, ChartOfAccountService, JobCardService, JournalService, AccountService],
})
export class AppModule { }
