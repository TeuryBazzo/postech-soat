import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDTO } from './dto/createclient.dto';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService {
  constructor(
    private clientRepository: ClientRepository,
  ) { }

  async getByCpf(cpf: string): Promise<Client | null> {
    return await this.clientRepository.getByCpf(cpf);
  }

  async create(createClientDto: CreateClientDTO): Promise<Client | null> {

    var client = new Client();
    client.cpf = createClientDto.cpf;
    client.email = createClientDto.email;
    client.name = createClientDto.name

     return await this.clientRepository.save(client);
  }

  
}
