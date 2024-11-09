import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Category, Supplier } from '@prisma/client';

@Injectable()
export class InventoryService {
    constructor(private prisma: PrismaService) { }

    // Category CRUD operations
    async getCategories(): Promise<Category[]> {
        return this.prisma.category.findMany();
    }

    async getCategoryById(id: number): Promise<Category | null> {
        return this.prisma.category.findUnique({ where: { id } });
    }

    async createCategory(data: Prisma.CategoryCreateInput): Promise<Category> {
        return this.prisma.category.create({ data });
    }

    async updateCategory(id: number, data: Prisma.CategoryUpdateInput): Promise<Category> {
        return this.prisma.category.update({ where: { id }, data });
    }

    async deleteCategory(id: number): Promise<Category> {
        return this.prisma.category.delete({ where: { id } });
    }

    // Supplier CRUD operations
    async getSuppliers(): Promise<Supplier[]> {
        return this.prisma.supplier.findMany();
    }

    async getSupplierById(id: number): Promise<Supplier | null> {
        return this.prisma.supplier.findUnique({ where: { id } });
    }

    async createSupplier(data: Prisma.SupplierCreateInput): Promise<Supplier> {
        return this.prisma.supplier.create({ data });
    }

    async updateSupplier(id: number, data: Prisma.SupplierUpdateInput): Promise<Supplier> {
        return this.prisma.supplier.update({ where: { id }, data });
    }

    async deleteSupplier(id: number): Promise<Supplier> {
        return this.prisma.supplier.delete({ where: { id } });
    }
}
