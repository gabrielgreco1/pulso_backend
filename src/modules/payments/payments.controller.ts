import { Controller, Post, Body, UseGuards, Logger, Req, Headers } from '@nestjs/common';
import { Request } from 'express';
import { PaymentsService } from './payments.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Public } from '@common/decorators/public.decorator';

/**
 * Payments controller
 * Handles Stripe checkout and webhooks
 */
@Controller('payments')
export class PaymentsController {
  private readonly logger = new Logger(PaymentsController.name);

  constructor(private readonly paymentsService: PaymentsService) {}

  /**
   * Create a Stripe checkout session
   */
  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async createCheckout(@CurrentUser() user: any, @Body() createCheckoutDto: CreateCheckoutDto) {
    this.logger.log(`POST /payments/checkout - User: ${user.id}, Plan: ${createCheckoutDto.plan}`);
    return this.paymentsService.createCheckoutSession(
      user.id,
      createCheckoutDto.plan,
      createCheckoutDto.successUrl,
      createCheckoutDto.cancelUrl,
    );
  }

  /**
   * Handle Stripe webhook events
   * This endpoint is public (no JWT required)
   */
  @Public()
  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Headers('stripe-signature') signature: string) {
    this.logger.log('POST /payments/webhook - Processing Stripe webhook');

    // Get raw body for signature verification
    const rawBody = req.body;

    await this.paymentsService.handleWebhook(rawBody, signature);

    return { received: true };
  }
}
