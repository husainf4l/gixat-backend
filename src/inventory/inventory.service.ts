import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, InventoryItem, Category } from '@prisma/client';

@Injectable()
export class InventoryService {
    constructor(private prisma: PrismaService) { }

    // Inventory Items
    async getAllInventoryItems(): Promise<InventoryItem[]> {
        return this.prisma.inventoryItem.findMany();
    }

    async createInventoryItem(data: Prisma.InventoryItemCreateInput): Promise<InventoryItem> {
        return this.prisma.inventoryItem.create({ data });
    }

    async updateInventoryItem(id: string, data: Prisma.InventoryItemUpdateInput): Promise<InventoryItem> {
        return this.prisma.inventoryItem.update({ where: { id }, data });
    }

    async deleteInventoryItem(id: string): Promise<InventoryItem> {
        return this.prisma.inventoryItem.delete({ where: { id } });
    }

    // Categories
    async getAllCategories(): Promise<Category[]> {
        return this.prisma.category.findMany();
    }

    async createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
        return this.prisma.category.create({ data });
    }
}
