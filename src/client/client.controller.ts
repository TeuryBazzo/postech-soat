import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Client } from './client.entity';
import { CreateClientDTO } from './dto/createclient.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GetClientByCpfUserCase } from './userCases/getClientByCpf.userCase';
import { CreateClientUserCase } from './userCases/createClient.userCase';
import { ReponseHttpHelper } from 'src/presentation/helpers/excption.http.helper';
import { ResponseDTO } from 'src/presentation/helpers/response.dto';
import { STATUS_CODES } from 'http';
import { HttpStatusCode } from 'axios';


@Controller("api/v1/clients")
@ApiTags('clients')
export class ClientController {
  constructor(
    private readonly reponseHttpHelper: ReponseHttpHelper,
    private getClientByCpfUserCase: GetClientByCpfUserCase,
    private createClientUserCase: CreateClientUserCase
  ) { }

  @Get()
  @ApiOperation({ summary: 'get client by cpf' })
  async getByCpf(@Query("cpf") cpf: string): Promise<ResponseDTO> {
    try {
      let person = await this.getClientByCpfUserCase.handle(cpf);

      return this.reponseHttpHelper.handleReponse(HttpStatusCode.Ok, '', person)

    } catch (error) {
      return this.reponseHttpHelper.handleException(error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'create client' })
  async create(@Body() client: CreateClientDTO): Promise<ResponseDTO> {
    try {
      let person = await this.createClientUserCase.handle(client);

      return this.reponseHttpHelper.handleReponse(HttpStatusCode.Created, '', person)

    } catch (error) {
      return this.reponseHttpHelper.handleException(error);
    }
  }

}
