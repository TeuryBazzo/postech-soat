import { InjectRepository } from '@nestjs/typeorm';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Client } from '../client.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsUniqueCpf', async: true })
@Injectable()
export class IsUniqueCpf implements ValidatorConstraintInterface {

    constructor( 
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,){
    }

  async validate(text: string, args: ValidationArguments) :  Promise<boolean> {
    return await this.IsUniqueCpf(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'CPF already exist';
  }

  private async IsUniqueCpf(cpf : string) : Promise<boolean> {
    var client = await this.clientRepository.findOne({
      where:{
        cpf :cpf
      }
    });

    return client == null;
  }
}