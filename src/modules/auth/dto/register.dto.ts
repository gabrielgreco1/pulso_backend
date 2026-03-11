import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

/**
 * DTO for user registration
 */
export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
