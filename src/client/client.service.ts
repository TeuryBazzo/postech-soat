import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDTO } from './dto/createclient.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) { }

  getByCpf(cpf: string): Promise<Client | null> {
    return this.clientRepository.findOne({
      where: {
        cpf: cpf,
      }
    });
  }

  async create(createClientDto: CreateClientDTO): Promise<Client | null> {

    var client = new Client();
    client.cpf = createClientDto.cpf;
    client.email = createClientDto.email;
    client.name = createClientDto.name

     return await this.clientRepository.save(client);
  }

  
}
