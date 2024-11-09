

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, JournalEntry, JournalLine } from '@prisma/client';

@Injectable()
export class JournalService {
    constructor(private prisma: PrismaService) { }

    // Get all journal entries with their line items
    async getAllJournalEntries(): Promise<JournalEntry[]> {
        return this.prisma.journalEntry.findMany({
            include: { journalLines: true },
        });
    }

    // Create a new journal entry
    async createJournalEntry(data: Prisma.JournalEntryCreateInput): Promise<JournalEntry> {
        return this.prisma.journalEntry.create({ data });
    }

    // Add a journal line item to a specific entry
    async addJournalLineItem(entryId: string, data: Prisma.JournalLineCreateInput): Promise<JournalLine> {
        // Ensure the journal entry exists
        const journalEntry = await this.prisma.journalEntry.findUnique({ where: { id: entryId } });
        if (!journalEntry) {
            throw new NotFoundException(`Journal Entry with ID ${entryId} not found`);
        }

        // Add line item to the journal entry
        return this.prisma.journalLine.create({
            data: {
                ...data,
            },
        });
    }
}
