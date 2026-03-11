import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '@modules/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

/**
 * Authentication service
 * Handles user registration, login, and JWT token generation
 */
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Register a new user
   */
  async register(registerDto: RegisterDto) {
    this.logger.log(`Registration attempt for: ${registerDto.email}`);

    // Create user (UsersService handles duplicate check and password hashing)
    const user = await this.usersService.create({
      email: registerDto.email,
      password: registerDto.password,
      name: registerDto.name,
    });

    // Generate JWT token
    const payload = {
      sub: (user as any)._id.toString(),
      email: user.email,
      plan: user.plan,
    };

    const accessToken = this.jwtService.sign(payload);

    this.logger.log(`Registration successful: ${registerDto.email}`);

    return {
      accessToken,
      user: {
        id: (user as any)._id.toString(),
        email: user.email,
        name: user.name,
        plan: user.plan,
      },
    };
  }

  /**
   * Validate user credentials and return JWT token
   */
  async login(loginDto: LoginDto) {
    this.logger.log(`Login attempt for: ${loginDto.email}`);

    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      this.logger.warn(`Login failed: User not found - ${loginDto.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);

    if (!isPasswordValid) {
      this.logger.warn(`Login failed: Invalid password - ${loginDto.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      this.logger.warn(`Login failed: User inactive - ${loginDto.email}`);
      throw new UnauthorizedException('Account is inactive');
    }

    const payload = {
      sub: (user as any)._id.toString(),
      email: user.email,
      plan: user.plan,
    };

    const accessToken = this.jwtService.sign(payload);

    this.logger.log(`Login successful: ${loginDto.email}`);

    return {
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        plan: user.plan,
      },
    };
  }

  /**
   * Get current user information
   */
  async getMe(userId: string) {
    this.logger.log(`Fetching user info for: ${userId}`);
    return this.usersService.findById(userId);
  }

  /**
   * Refresh access token
   * For now, we'll use the same JWT secret
   * In production, you might want separate refresh tokens
   */
  async refreshToken(userId: string) {
    this.logger.log(`Refreshing token for user: ${userId}`);

    const user = await this.usersService.findById(userId);

    const payload = {
      sub: (user as any)._id.toString(),
      email: user.email,
      plan: user.plan,
    };

    const accessToken = this.jwtService.sign(payload);

    this.logger.log(`Token refreshed for user: ${userId}`);

    return {
      accessToken,
    };
  }

  /**
   * Validate JWT token payload
   */
  async validateUser(payload: any) {
    this.logger.log(`Validating token for user: ${payload.email}`);
    return this.usersService.findById(payload.sub);
  }
}
