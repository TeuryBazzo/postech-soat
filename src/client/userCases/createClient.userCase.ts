import { GetClientByCpfUserCase } from 'src/client/userCases/getClientByCpf.userCase';
import { ConflictException, Injectable } from "@nestjs/common";
import { ClientRepository } from "../client.repository";
import { Client } from "../client.entity";
import { CreateClientDTO } from "../dto/createclient.dto";
import { IsUniqueCpfUserCase } from './isUniqueCpf.userCase';

@Injectable()
export class CreateClientUserCase {

    constructor(
        private clientRepository: ClientRepository,
        private isUniqueCpfUserCase: IsUniqueCpfUserCase,
      ) { }

      async handle(createClientDto: CreateClientDTO): Promise<Client | null> {

        var client = new Client();
        client.cpf = createClientDto.cpf;
        client.email = createClientDto.email;
        client.name = createClientDto.name;

        if(await this.isUniqueCpfUserCase.handle(client.cpf))
          throw new ConflictException("CPF already exist")
    
         return await this.clientRepository.save(client);
      }
    
}