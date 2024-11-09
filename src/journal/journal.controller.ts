import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { JournalService } from './journal.service';
import { Prisma, JournalEntry, JournalLine } from '@prisma/client';

@Controller('journal')
export class JournalController {
    constructor(private readonly journalService: JournalService) { }

    // Get all journal entries
    @Get('entries')
    async getAllJournalEntries(): Promise<JournalEntry[]> {
        return this.journalService.getAllJournalEntries();
    }

    // Create a new journal entry
    @Post('entries')
    async createJournalEntry(@Body() data: Prisma.JournalEntryCreateInput): Promise<JournalEntry> {
        return this.journalService.createJournalEntry(data);
    }

    // Add a line item to a specific journal entry
    @Post('entries/:id/line-items')
    async addJournalLineItem(
        @Param('id', ParseIntPipe) id: string,
        @Body() data: Prisma.JournalLineCreateInput,
    ): Promise<JournalLine> {
        return this.journalService.addJournalLineItem(id, data);
    }
}
