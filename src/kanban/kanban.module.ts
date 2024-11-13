import { Module } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BoardGateway } from './kanban.gateway';

@Module({
  controllers: [],
  providers: [KanbanService, BoardGateway, PrismaService]
})
export class KanbanModule { }
