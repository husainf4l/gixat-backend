import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Prisma } from '@prisma/client';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    @Get('items')
    async getAllInventoryItems() {
        return this.inventoryService.getAllInventoryItems();
    }

    @Post('items')
    async createInventoryItem(@Body() data: Prisma.InventoryItemCreateInput) {
        return this.inventoryService.createInventoryItem(data);
    }

    @Put('items/:id')
    async updateInventoryItem(@Param('id') id: string, @Body() data: Prisma.InventoryItemUpdateInput) {
        return this.inventoryService.updateInventoryItem(id, data);
    }

    @Delete('items/:id')
    async deleteInventoryItem(@Param('id') id: string) {
        return this.inventoryService.deleteInventoryItem(id);
    }

    @Get('categories')
    async getAllCategories() {
        return this.inventoryService.getAllCategories();
    }

    @Post('categories')
    async createCategory(@Body() data: Prisma.CategoryCreateInput) {
        return this.inventoryService.createCategory(data);
    }
}
