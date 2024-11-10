import { Module } from '@nestjs/common';
import { CatgoryController } from './catgory.controller';
import { CatgoryService } from './catgory.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CatgoryController],
  providers: [CatgoryService, PrismaService]
})
export class CatgoryModule { }
