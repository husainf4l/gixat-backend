import { Module } from '@nestjs/common';
import { AccountReceivableController } from './account-receivable.controller';
import { AccountReceivableService } from './account-receivable.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[AuthModule],
  controllers: [AccountReceivableController],
  providers: [AccountReceivableService, PrismaService, UserService]
})
export class AccountReceivableModule {}
