import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validateCPF } from './document.utils';

@ValidatorConstraint({ name: 'document', async: false })
export class CPFValidator implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    return validateCPF(String(value));
  }

  defaultMessage(): string {
    return 'CPF inválido';
  }
}
