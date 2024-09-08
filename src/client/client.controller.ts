// src/client/client.controller.ts

import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto, UpdateClientDto } from './dto/client.dto';

@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @Post()
    async createClient(@Body() createClientDto: CreateClientDto) {
        return this.clientService.createClient(createClientDto);
    }

    @Get()
    async findAllClients() {
        return this.clientService.findAllClients();
    }

    @Get(':id')
    async findClientById(@Param('id') id: string) {
        return this.clientService.findClientById(+id);
    }

    @Patch(':id')
    async updateClient(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
        return this.clientService.updateClient(+id, updateClientDto);
    }

    @Delete(':id')
    async deleteClient(@Param('id') id: string) {
        return this.clientService.deleteClient(+id);
    }
}
