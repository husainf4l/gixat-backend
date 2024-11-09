import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Prisma } from '@prisma/client';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) { }

    // Category Endpoints
    @Get('categories')
    async getCategories() {
        return this.inventoryService.getCategories();
    }

    @Get('categories/:id')
    async getCategoryById(@Param('id') id: string) {
        const category = await this.inventoryService.getCategoryById(Number(id));
        if (!category) throw new NotFoundException('Category not found');
        return category;
    }

    @Post('categories')
    async createCategory(@Body() data: Prisma.CategoryCreateInput) {
        try {
            return this.inventoryService.createCategory(data);
        } catch (error) {
            throw new BadRequestException('Failed to create category');
        }
    }

    @Put('categories/:id')
    async updateCategory(@Param('id') id: string, @Body() data: Prisma.CategoryUpdateInput) {
        try {
            return this.inventoryService.updateCategory(Number(id), data);
        } catch (error) {
            throw new BadRequestException('Failed to update category');
        }
    }

    @Delete('categories/:id')
    async deleteCategory(@Param('id') id: string) {
        const category = await this.inventoryService.getCategoryById(Number(id));
        if (!category) throw new NotFoundException('Category not found');
        return this.inventoryService.deleteCategory(Number(id));
    }

    // Supplier Endpoints
    @Get('suppliers')
    async getSuppliers() {
        return this.inventoryService.getSuppliers();
    }

    @Get('suppliers/:id')
    async getSupplierById(@Param('id') id: string) {
        const supplier = await this.inventoryService.getSupplierById(Number(id));
        if (!supplier) throw new NotFoundException('Supplier not found');
        return supplier;
    }

    @Post('suppliers')
    async createSupplier(@Body() data: Prisma.SupplierCreateInput) {
        try {
            return this.inventoryService.createSupplier(data);
        } catch (error) {
            throw new BadRequestException('Failed to create supplier');
        }
    }

    @Put('suppliers/:id')
    async updateSupplier(@Param('id') id: string, @Body() data: Prisma.SupplierUpdateInput) {
        try {
            return this.inventoryService.updateSupplier(Number(id), data);
        } catch (error) {
            throw new BadRequestException('Failed to update supplier');
        }
    }

    @Delete('suppliers/:id')
    async deleteSupplier(@Param('id') id: string) {
        const supplier = await this.inventoryService.getSupplierById(Number(id));
        if (!supplier) throw new NotFoundException('Supplier not found');
        return this.inventoryService.deleteSupplier(Number(id));
    }
}
