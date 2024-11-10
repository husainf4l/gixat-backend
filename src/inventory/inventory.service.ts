import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, InventoryItem, Category } from '@prisma/client';

@Injectable()
export class InventoryService {
    constructor(private prisma: PrismaService) { }


    async createInventoryItem(data: Prisma.InventoryItemCreateInput): Promise<InventoryItem> {
        // Fetch the Inventory account (Asset Account) by its name
        const inventoryAccount = await this.prisma.chartOfAccount.findUnique({
            where: {
                name: 'Inventory',
            },
        });

        if (!inventoryAccount) {
            throw new Error('Inventory account not found');
        }


        const inventoryItem = await this.prisma.inventoryItem.create({
            data: {
                ...data,
                assetAccount: {
                    connect: { id: inventoryAccount.id },
                },
            },
        });

        return inventoryItem;
    }


    async searchInventoryItems(query: string) {
        return this.prisma.inventoryItem.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                    {
                        description: {
                            contains: query,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        });
    }



    // Inventory Items
    async getAllInventoryItems(): Promise<InventoryItem[]> {
        return this.prisma.inventoryItem.findMany();
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
