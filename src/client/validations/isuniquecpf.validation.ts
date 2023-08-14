import { InjectRepository } from '@nestjs/typeorm';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Client } from '../client.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ClientRepository } from '../client.repository';
import { ClientService } from '../client.service';

@ValidatorConstraint({ name: 'IsUniqueCpf', async: true })
@Injectable()
export class IsUniqueCpf implements ValidatorConstraintInterface {

    constructor( 
    private clientService: ClientService,){
    }

  async validate(text: string, args: ValidationArguments) :  Promise<boolean> {
    return await this.clientService.IsUniqueCpf(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'CPF already exist';
  }
}