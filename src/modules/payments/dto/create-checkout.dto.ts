import { IsString, IsNotEmpty, IsIn, IsOptional, IsUrl } from 'class-validator';

/**
 * DTO for creating a Stripe checkout session
 */
export class CreateCheckoutDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['essential', 'professional', 'strategic'], {
    message: 'Plan must be one of: essential, professional, strategic',
  })
  plan: string;

  @IsOptional()
  @IsUrl()
  successUrl?: string;

  @IsOptional()
  @IsUrl()
  cancelUrl?: string;
}
