import { Controller, Get, Param, Logger } from '@nestjs/common';
import { PlansService } from './plans.service';
import { Public } from '@common/decorators/public.decorator';

@Controller('plans')
export class PlansController {
  private readonly logger = new Logger(PlansController.name);

  constructor(private readonly plansService: PlansService) {}

  @Public()
  @Get()
  getAllPlans() {
    this.logger.log('GET /plans - Fetching all plans');
    return this.plansService.getAllPlans();
  }

  @Public()
  @Get(':name')
  getPlan(@Param('name') name: string) {
    this.logger.log(`GET /plans/${name}`);
    return this.plansService.getPlan(name);
  }
}
