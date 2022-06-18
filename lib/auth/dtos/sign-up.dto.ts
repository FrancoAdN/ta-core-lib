import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
  IsDefined,
} from 'class-validator';
import { EmailType } from '../../utils';

export class SignUpDto {
  @IsDefined()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  name: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  lastname: string;

  @IsDefined()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsDefined()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsDefined()
  @IsString()
  @IsEmail()
  email: EmailType;
}
