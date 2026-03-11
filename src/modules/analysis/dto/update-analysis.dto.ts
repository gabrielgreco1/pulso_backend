import { IsEnum, IsOptional, IsNumber, Min, Max } from 'class-validator';

/**
 * DTO for updating analysis status and progress
 */
export class UpdateAnalysisDto {
  @IsEnum(['pending', 'scraping', 'analyzing', 'done', 'error'])
  @IsOptional()
  status?: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  progress?: number;

  @IsOptional()
  errorMessage?: string;
}
