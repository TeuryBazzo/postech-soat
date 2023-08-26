import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { IsUniqueCpfUserCase } from '../userCases/isUniqueCpf.userCase';

@ValidatorConstraint({ name: 'IsUniqueCpf', async: true })
@Injectable()
export class IsUniqueCpf implements ValidatorConstraintInterface {

    constructor( 
    private isUniqueCpfUserCase: IsUniqueCpfUserCase,){
    }

  async validate(text: string, args: ValidationArguments) :  Promise<boolean> {
    return await this.isUniqueCpfUserCase.handle(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'CPF already exist';
  }
}