import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

/**
 * DTO for creating a new analysis
 */
export class CreateAnalysisDto {
  @IsString()
  @IsNotEmpty()
  targetName: string;

  @IsEnum(['politician', 'influencer', 'celebrity'])
  @IsOptional()
  targetType?: string;

  @IsOptional()
  portals?: string[];

  @IsOptional()
  plan?: string;

  @IsOptional()
  @IsString()
  instagramProfile?: string;
}
