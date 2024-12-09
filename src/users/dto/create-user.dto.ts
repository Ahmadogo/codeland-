import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  firstName: String;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(20)
  lastName: String;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: String;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message: 'Password must contains a letter, number, and a special character',
  })
  password: string;
}
