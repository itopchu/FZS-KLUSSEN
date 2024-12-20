import { IsString, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateContactInfoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  surname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  address: string;

  @IsString()
  @MaxLength(600)
  description: string;
}
