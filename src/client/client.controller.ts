import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { CreateClientDTO } from './dto/createclient.dto';


@Controller("api/v1/clients")
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Get()
  getByCpf(@Query("cpf") cpf: string): Promise<Client | null> {
    return this.clientService.getByCpf(cpf);
  }

  @Post()
  create(@Body() client: CreateClientDTO): Promise<Client | null> {
      return this.clientService.create(client);
  }

}
