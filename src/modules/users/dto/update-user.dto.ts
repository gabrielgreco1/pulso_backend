import { IsEmail, IsString, IsOptional, IsEnum, IsBoolean } from 'class-validator';

/**
 * DTO for updating user information
 */
export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(['essential', 'professional', 'strategic'])
  @IsOptional()
  plan?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
