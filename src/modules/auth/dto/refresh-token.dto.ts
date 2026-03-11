import { IsString, IsNotEmpty } from 'class-validator';

/**
 * DTO for refresh token request
 */
export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
