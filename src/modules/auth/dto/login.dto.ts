import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

/**
 * DTO for user login
 */
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
