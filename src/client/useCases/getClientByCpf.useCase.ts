import { Injectable, NotFoundException } from "@nestjs/common";
import { ClientRepository } from "../client.repository";
import { Client } from "../client.entity";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GetClientByCpfuseCase {

  constructor(
    private clientRepository: ClientRepository,
    private configService: ConfigService,
    private readonly httpService: HttpService
  ) { }

  async handle(cpf: string): Promise<Client | null> {

    let url = this.configService.get<string>('AZURE_FUNCTION_URL')  as string;
    let key = this.configService.get<string>('AZURE_FUNCTION_AUTHENTICATE_KEY');


    let result = await firstValueFrom( this.httpService.get<any>(url, {
      headers : {
        "x-functions-key" : key
      }
    }));

    if(result.status == 200){
      console.log(result.data);
    }else {
      console.log(result.data);
    }


    let person = await this.clientRepository.getByCpf(cpf);

    if (!person)
      throw new NotFoundException("Client not found");

    return person;
  }

  async get(url:string){
    return await this.httpService.get(url);
  }

}