// src/client/client.module.ts

import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaService } from '../prisma/prisma.service'; // Assuming PrismaService is already created

@Module({
  controllers: [ClientController],
  providers: [ClientService, PrismaService],
})
export class ClientModule { }
