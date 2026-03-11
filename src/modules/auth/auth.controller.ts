import { Controller, Post, Get, Body, Logger, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from '@common/decorators/public.decorator';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

/**
 * Authentication controller
 * Handles login, registration, and user info endpoints
 */
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  /**
   * Register a new user
   */
  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    this.logger.log(`POST /auth/register - Registration attempt: ${registerDto.email}`);
    return this.authService.register(registerDto);
  }

  /**
   * Login with email and password
   */
  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    this.logger.log(`POST /auth/login - Login attempt: ${loginDto.email}`);
    return this.authService.login(loginDto);
  }

  /**
   * Get current user information
   * Protected route - requires valid JWT
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: any) {
    this.logger.log(`GET /auth/me - User: ${user.email}`);
    return this.authService.getMe(user.id);
  }

  /**
   * Refresh access token
   * Protected route - requires valid JWT
   */
  @UseGuards(JwtAuthGuard)
  @Post('refresh-token')
  refreshToken(@CurrentUser() user: any) {
    this.logger.log(`POST /auth/refresh-token - User: ${user.email}`);
    return this.authService.refreshToken(user.id);
  }
}
