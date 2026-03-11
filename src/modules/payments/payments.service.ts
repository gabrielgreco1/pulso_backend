import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { UsersService } from '@modules/users/users.service';
import { PlansService } from '@modules/plans/plans.service';

/**
 * Service for Stripe payment integration
 * Handles checkout sessions and webhook events
 */
@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private readonly stripe: Stripe;
  private readonly stripeWebhookSecret: string | undefined;

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private plansService: PlansService,
  ) {
    const stripeSecretKey = this.configService.get<string>('stripe.secretKey')!;
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    // Webhook secret is optional for development
    this.stripeWebhookSecret = this.configService.get<string>('stripe.webhookSecret');

    if (!this.stripeWebhookSecret) {
      this.logger.warn(
        'Stripe webhook secret not configured - webhook signature verification disabled',
      );
    }
  }

  /**
   * Create a Stripe checkout session
   */
  async createCheckoutSession(
    userId: string,
    planName: string,
    successUrl?: string,
    cancelUrl?: string,
  ): Promise<{ sessionId: string; url: string }> {
    this.logger.log(`Creating checkout session for user ${userId}, plan: ${planName}`);

    // Get plan details
    const plan = this.plansService.getPlan(planName);
    if (!plan) {
      throw new BadRequestException(`Invalid plan: ${planName}`);
    }

    // Get user
    const user = await this.usersService.findById(userId);

    // Create or get Stripe customer
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await this.stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: userId,
        },
      });
      customerId = customer.id;
      await this.usersService.updateStripeCustomerId(userId, customerId);
      this.logger.log(`Created Stripe customer: ${customerId} for user ${userId}`);
    }

    // Create checkout session
    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: plan.name,
              description: plan.features.join(', '),
            },
            unit_amount: plan.price * 100, // Convert to cents
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      success_url:
        successUrl || `${this.configService.get('app.frontendUrl')}/dashboard?payment=success`,
      cancel_url:
        cancelUrl || `${this.configService.get('app.frontendUrl')}/plans?payment=cancelled`,
      metadata: {
        userId: userId,
        plan: planName,
      },
    });

    this.logger.log(`Checkout session created: ${session.id} for user ${userId}`);

    return {
      sessionId: session.id,
      url: session.url!,
    };
  }

  /**
   * Handle Stripe webhook events
   */
  async handleWebhook(rawBody: Buffer, signature: string): Promise<void> {
    let event: Stripe.Event;

    // Verify webhook signature if secret is configured
    if (this.stripeWebhookSecret && signature) {
      try {
        event = this.stripe.webhooks.constructEvent(rawBody, signature, this.stripeWebhookSecret);
        this.logger.log(`Webhook signature verified: ${event.type}`);
      } catch (err: any) {
        this.logger.error(`Webhook signature verification failed: ${err.message}`);
        throw new BadRequestException('Invalid webhook signature');
      }
    } else {
      // Parse without verification (development mode)
      event = JSON.parse(rawBody.toString());
      this.logger.warn(`Processing webhook WITHOUT signature verification: ${event.type}`);
    }

    this.logger.log(`Processing webhook event: ${event.type}`);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      default:
        this.logger.log(`Unhandled webhook event type: ${event.type}`);
    }
  }

  /**
   * Handle checkout.session.completed event
   */
  private async handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
    this.logger.log(`Checkout completed: ${session.id}`);

    const userId = session.metadata?.userId;
    const plan = session.metadata?.plan;

    if (!userId || !plan) {
      this.logger.error('Missing userId or plan in checkout session metadata');
      return;
    }

    // Update user plan
    await this.usersService.update(userId, { plan } as any);
    this.logger.log(`User ${userId} plan updated to: ${plan}`);
  }

  /**
   * Handle customer.subscription.updated event
   */
  private async handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<void> {
    this.logger.log(`Subscription updated: ${subscription.id}`);

    const customerId = subscription.customer as string;

    // Find user by Stripe customer ID
    const users = await this.usersService.findAll();
    const user = users.find((u) => (u as any).stripeCustomerId === customerId);

    if (!user) {
      this.logger.error(`User not found for Stripe customer: ${customerId}`);
      return;
    }

    // Check subscription status
    if (subscription.status === 'active') {
      this.logger.log(`Subscription active for user ${(user as any)._id}`);
    } else if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
      // Downgrade to essential
      await this.usersService.update((user as any)._id.toString(), { plan: 'essential' } as any);
      this.logger.log(
        `User ${(user as any)._id} downgraded to essential due to subscription status: ${subscription.status}`,
      );
    }
  }

  /**
   * Handle customer.subscription.deleted event
   */
  private async handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
    this.logger.log(`Subscription deleted: ${subscription.id}`);

    const customerId = subscription.customer as string;

    // Find user by Stripe customer ID
    const users = await this.usersService.findAll();
    const user = users.find((u) => (u as any).stripeCustomerId === customerId);

    if (!user) {
      this.logger.error(`User not found for Stripe customer: ${customerId}`);
      return;
    }

    // Downgrade to essential
    await this.usersService.update((user as any)._id.toString(), { plan: 'essential' } as any);
    this.logger.log(
      `User ${(user as any)._id} downgraded to essential after subscription deletion`,
    );
  }
}
