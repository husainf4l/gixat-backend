import { Module } from '@nestjs/common';
import { BulkController } from './bulk.controller';
import { BulkService } from './bulk.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BulkController],
  providers: [BulkService, PrismaService]
})
export class BulkModule { }
