// src/client/client.controller.ts

import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { Prisma } from '@prisma/client';

@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @Post()
    async createClient(@Body() data: Prisma.ClientCreateInput) {
        return this.clientService.createClient(data);
    }

    @Get('all')
    async getAllClients() {
        return this.clientService.findAllClients();
    }

    @Get('limit')
    async findAllClientsL(
        @Query('page') page = 1,   // default to page 1
        @Query('limit') limit = 10 // default to 10 clients per page
    ) {
        return this.clientService.findAllClientsL({ page: Number(page), limit: Number(limit) });
    }


    @Get('search')
    async searchClients(@Query('q') query: string) {
        return this.clientService.searchClients(query);
    }

    @Get(':id')
    async findClientById(@Param('id') id: string) {
        return this.clientService.findClientById(id);
    }

    @Patch(':id')
    async updateClient(@Param('id') id: string, @Body() updateClient: Prisma.ClientUpdateInput) {
        return this.clientService.updateClient(id, updateClient);
    }

    @Delete(':id')
    async deleteClient(@Param('id') id: string) {
        return this.clientService.deleteClient(id);
    }
}
