import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { CreateClientDTO } from './dto/createclient.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';


@Controller("api/v1/clients")
@ApiTags('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Get()
  @ApiOperation({ summary: 'get client by cpf' })
  getByCpf(@Query("cpf") cpf: string): Promise<Client | null> {
    return this.clientService.getByCpf(cpf);
  }

  @Post()
  @ApiOperation({ summary: 'create client' })
  create(@Body() client: CreateClientDTO): Promise<Client | null> {
      return this.clientService.create(client);
  }

}
