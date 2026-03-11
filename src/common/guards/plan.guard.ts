import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRED_PLAN_KEY } from '@common/decorators/require-plan.decorator';

/**
 * Plan hierarchy for comparison
 */
const PLAN_HIERARCHY = {
  essential: 1,
  professional: 2,
  strategic: 3,
};

/**
 * Plan Guard
 * Validates that the user's subscription plan meets the required level
 * Use with @RequirePlan() decorator
 */
@Injectable()
export class PlanGuard implements CanActivate {
  private readonly logger = new Logger(PlanGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPlan = this.reflector.getAllAndOverride<string>(REQUIRED_PLAN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPlan) {
      // No plan requirement, allow access
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      this.logger.warn('Plan guard: No user found in request');
      throw new ForbiddenException('Authentication required');
    }

    const userPlanLevel = PLAN_HIERARCHY[user.plan as keyof typeof PLAN_HIERARCHY] || 0;
    const requiredPlanLevel = PLAN_HIERARCHY[requiredPlan as keyof typeof PLAN_HIERARCHY] || 0;

    if (userPlanLevel < requiredPlanLevel) {
      this.logger.warn(
        `Plan guard: User ${user.email} with plan ${user.plan} attempted to access ${requiredPlan}-only resource`,
      );
      throw new ForbiddenException(
        `This feature requires ${requiredPlan} plan or higher. Your current plan: ${user.plan}`,
      );
    }

    this.logger.log(`Plan guard: User ${user.email} authorized for ${requiredPlan} resource`);
    return true;
  }
}
