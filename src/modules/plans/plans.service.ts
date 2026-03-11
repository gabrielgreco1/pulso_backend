import { Injectable, Logger } from '@nestjs/common';

/**
 * Service for managing subscription plans
 * Defines plan features and limits
 */
@Injectable()
export class PlansService {
  private readonly logger = new Logger(PlansService.name);

  private readonly plans = {
    essential: {
      name: 'Essential',
      price: 990, // R$ 990/month
      maxTargets: 1, // maxFigures
      maxPortals: 3,
      updateFrequency: 'weekly',
      features: ['General AI analysis', 'Weekly updates'],
    },
    professional: {
      name: 'Professional',
      price: 490, // R$ 490/month
      maxTargets: 3,
      maxPortals: 10,
      updateFrequency: 'weekly',
      features: [
        'Detailed per-article analysis',
        'Temperature & acceptance scores',
        'Weekly updates',
      ],
    },
    strategic: {
      name: 'Strategic',
      price: 4990, // R$ 4990/month
      maxTargets: 5,
      maxPortals: 10,
      updateFrequency: 'every-3-days',
      features: [
        'Per-portal score',
        'Bias map',
        'Positioning recommendations',
        'Weekly PDF report',
        'Updates every 3 days',
      ],
    },
  };

  /**
   * Get all available plans
   */
  getAllPlans() {
    this.logger.log('Fetching all plans');
    return this.plans;
  }

  /**
   * Get specific plan details
   */
  getPlan(planName: string) {
    this.logger.log(`Fetching plan: ${planName}`);
    return this.plans[planName as keyof typeof this.plans] || null;
  }

  /**
   * Check if user can perform action based on plan limits
   */
  canUserPerformAction(
    userPlan: string,
    action: 'create_target' | 'create_portal',
    currentCount: number,
  ): boolean {
    const plan = this.getPlan(userPlan);
    if (!plan) {
      this.logger.warn(`Invalid plan: ${userPlan}`);
      return false;
    }

    const limit = action === 'create_target' ? plan.maxTargets : plan.maxPortals;
    const canPerform = currentCount < limit;

    this.logger.log(
      `User with ${userPlan} plan ${canPerform ? 'CAN' : 'CANNOT'} ${action} (${currentCount}/${limit})`,
    );

    return canPerform;
  }
}
