import { Injectable } from '@nestjs/common';
import { Category, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CatgoryService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.CategoryCreateInput) {
        return await this.prisma.category.create({
            data,
        });
    }

    async findAll(): Promise<Category[]> {
        return this.prisma.category.findMany({
            include: {
                parentCategory: true,
                subcategories: true
            },
        });
    }
    async findOne(id: string) {
        return this.prisma.category.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: Prisma.CategoryUpdateInput) {
        return this.prisma.category.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.category.delete({
            where: { id },
        });
    }

}
