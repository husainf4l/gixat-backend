import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AccountPayableService } from './account-payable.service';
import { AccountPayable, Prisma } from '@prisma/client';

@Controller('account-payables')
export class AccountPayableController {
    constructor(private readonly accountPayableService: AccountPayableService) { }

    @Post()
    async create(@Body() createAccountPayable: Prisma.AccountPayableCreateInput): Promise<AccountPayable> {
        return this.accountPayableService.create(createAccountPayable);
    }

    @Get()
    async findAll(): Promise<AccountPayable[]> {
        return this.accountPayableService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<AccountPayable> {
        return this.accountPayableService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAccountPayable: Prisma.AccountPayableUpdateInput,
    ): Promise<AccountPayable> {
        return this.accountPayableService.update(id, updateAccountPayable);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.accountPayableService.remove(id);
    }
}
