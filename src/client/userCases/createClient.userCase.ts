import { Injectable } from "@nestjs/common";
import { ClientRepository } from "../client.repository";
import { Client } from "../client.entity";
import { CreateClientDTO } from "../dto/createclient.dto";

@Injectable()
export class CreateClientUserCase {

    constructor(
        private clientRepository: ClientRepository
      ) { }

      async handle(createClientDto: CreateClientDTO): Promise<Client | null> {

        var client = new Client();
        client.cpf = createClientDto.cpf;
        client.email = createClientDto.email;
        client.name = createClientDto.name
    
         return await this.clientRepository.save(client);
      }
    
}