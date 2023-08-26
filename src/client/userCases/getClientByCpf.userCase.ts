import { Injectable } from "@nestjs/common";
import { ClientRepository } from "../client.repository";
import { Client } from "../client.entity";

@Injectable()
export class GetClientByCpfUserCase {

    constructor(
        private clientRepository: ClientRepository
      ) { }

      async handle(cpf: string): Promise<Client | null> {
        return await this.clientRepository.getByCpf(cpf);
      }
    
}