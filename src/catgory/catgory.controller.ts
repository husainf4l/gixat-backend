import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CatgoryService } from './catgory.service';
import { Category, Prisma } from '@prisma/client';

@Controller('catgory')
export class CatgoryController {


    constructor(private readonly categoryService: CatgoryService) { }

    // Create a new category
    @Post()
    async create(@Body() createCategoryDto: Prisma.CategoryCreateInput): Promise<Category> {
        return this.categoryService.create(createCategoryDto);
    }

    // Get all categories
    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    // Get a category by ID
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Category> {
        return this.categoryService.findOne(id);
    }

    // Update a category
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateCategoryDto: Prisma.CategoryUpdateInput,
    ): Promise<Category> {
        return this.categoryService.update(id, updateCategoryDto);
    }

    // Delete a category
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.categoryService.remove(id);
    }

}
