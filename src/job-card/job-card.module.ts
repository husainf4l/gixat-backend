import { Module } from '@nestjs/common';
import { JobCardService } from './job-card.service';
import { JobCardController } from './job-card.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],

  providers: [JobCardService, PrismaService],
  controllers: [JobCardController]
})
export class JobCardModule { }
