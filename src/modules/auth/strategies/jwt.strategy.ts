import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@modules/users/users.service';

/**
 * JWT Strategy for Passport
 * Validates JWT tokens and extracts user information
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  /**
   * Validate JWT payload and return user
   * This method is called automatically by Passport after token verification
   */
  async validate(payload: any) {
    this.logger.log(`Validating JWT for user: ${payload.email}`);

    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      this.logger.warn(`JWT validation failed: User not found - ${payload.email}`);
      throw new UnauthorizedException('User not found');
    }

    if (!user.isActive) {
      this.logger.warn(`JWT validation failed: User inactive - ${payload.email}`);
      throw new UnauthorizedException('Account is inactive');
    }

    // This will be attached to request.user
    return {
      id: (user as any)._id.toString(),
      email: user.email,
      name: user.name,
      plan: user.plan,
    };
  }
}
