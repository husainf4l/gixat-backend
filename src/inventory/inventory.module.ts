import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [InventoryService, PrismaService],
  controllers: [InventoryController]
})
export class InventoryModule { }
