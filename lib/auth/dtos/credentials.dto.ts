import { IsEmail, IsString } from 'class-validator';
import { EmailType } from '../../utils';

export class CredentialsDto {
  @IsString()
  @IsEmail()
  email: EmailType;

  @IsString()
  password: string;
}
