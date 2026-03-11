import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { UsersModule } from '@modules/users/users.module';
import { PlansModule } from '@modules/plans/plans.module';

/**
 * Payments module
 * Handles Stripe integration
 */
@Module({
  imports: [UsersModule, PlansModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
