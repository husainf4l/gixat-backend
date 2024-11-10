import { Module } from '@nestjs/common';
import { QuickbooksService } from './quickbooks.service';
import { QuickbooksController } from './quickbooks.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot(),  // Add this to load the .env file
  ],  // Make sure HttpModule is imported here

  providers: [QuickbooksService, PrismaService],
  controllers: [QuickbooksController]
})
export class QuickbooksModule { }
