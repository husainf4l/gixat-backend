import { Module } from '@nestjs/common';
import { JobCardService } from './job-card.service';
import { JobCardController } from './job-card.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [JobCardService, PrismaService],
  controllers: [JobCardController]
})
export class JobCardModule { }
