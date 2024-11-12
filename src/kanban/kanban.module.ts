import { Module } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [],
  providers: [KanbanService, PrismaService]
})
export class KanbanModule {}
