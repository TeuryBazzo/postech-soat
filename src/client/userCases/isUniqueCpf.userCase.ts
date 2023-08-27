import { Injectable } from "@nestjs/common";
import { ClientRepository } from "../client.repository";

@Injectable()
export class IsUniqueCpfUserCase {

    constructor(
        private clientRepository: ClientRepository
    ) { }


    async handle(cpf: string): Promise<boolean> {
        var client = await this.clientRepository.getByCpf(cpf);
        return client != null;
    }

}