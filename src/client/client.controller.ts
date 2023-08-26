import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Client } from './client.entity';
import { CreateClientDTO } from './dto/createclient.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GetClientByCpfUserCase } from './userCases/getClientByCpf.userCase';
import { CreateClientUserCase } from './userCases/createClient.userCase';


@Controller("api/v1/clients")
@ApiTags('clients')
export class ClientController {
  constructor(
    private getClientByCpfUserCase: GetClientByCpfUserCase,
    private createClientUserCase: CreateClientUserCase
    ) { }

  @Get()
  @ApiOperation({ summary: 'get client by cpf' })
  getByCpf(@Query("cpf") cpf: string): Promise<Client | null> {
    return this.getClientByCpfUserCase.handle(cpf);
  }

  @Post()
  @ApiOperation({ summary: 'create client' })
  create(@Body() client: CreateClientDTO): Promise<Client | null> {
      return this.createClientUserCase.handle(client);
  }

}
