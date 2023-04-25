import {
  IsDateString,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator';
// import { CPFValidator } from 'src/validator/cpf.validator';

export default class CreateUserBody {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  // @Validate(CPFValidator)
  document: string;

  @IsDateString()
  @IsNotEmpty()
  birthdate: Date | string;
}
