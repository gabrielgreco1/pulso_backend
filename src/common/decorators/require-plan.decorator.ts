import { SetMetadata } from '@nestjs/common';

/**
 * Require Plan decorator
 * Use this to mark routes that require a specific subscription plan
 * Example: @RequirePlan('professional')
 */
export const REQUIRED_PLAN_KEY = 'requiredPlan';
export const RequirePlan = (plan: 'essential' | 'professional' | 'strategic') =>
  SetMetadata(REQUIRED_PLAN_KEY, plan);
