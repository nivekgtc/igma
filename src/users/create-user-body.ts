import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { CPFValidator } from 'src/validator/cpf.validator';

export default class CreateUserBody {
  @ApiProperty({
    description: 'The name of an user',
    example: 'Kevin',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @ApiProperty({
    description: 'The document of an user',
    example: '701.846.604-44',
  })
  @IsString()
  @IsNotEmpty()
  @Validate(CPFValidator)
  document: string;

  @ApiProperty({
    description: 'The birthdate of an user',
    example: '2023-04-25T15:28:34.215Z',
  })
  @IsDateString()
  @IsNotEmpty()
  birthdate: Date | string;
}
