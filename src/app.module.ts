import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';

// Configuration
import { databaseConfig, jwtConfig, appConfig, stripeConfig, openaiConfig } from './config';

// Common
import { AllExceptionsFilter } from '@common/filters/all-exceptions.filter';
import { LoggingInterceptor } from '@common/interceptors/logging.interceptor';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';

// Modules
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { AnalysisModule } from '@modules/analysis/analysis.module';
import { NewsModule } from '@modules/news/news.module';
import { AiModule } from '@modules/ai/ai.module';
import { ScrapingModule } from '@modules/scraping/scraping.module';
import { PaymentsModule } from '@modules/payments/payments.module';
import { PlansModule } from '@modules/plans/plans.module';

/**
 * Main application module
 * Configures all modules, database, logging, and global providers
 */
@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, appConfig, stripeConfig, openaiConfig],
    }),

    // MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000,
        // Disable command buffering so it fails immediately if not connected
        bufferCommands: false,
        connectionFactory: (connection: any) => {
          connection.on('error', (err: any) => {
            console.error('Mongoose connection error:', err);
          });
          return connection;
        },
      }),
      inject: [ConfigService],
    }),

    // Feature modules
    UsersModule,
    AuthModule,
    AnalysisModule,
    NewsModule,
    AiModule,
    ScrapingModule,
    PaymentsModule,
    PlansModule,
  ],
  providers: [
    // Global exception filter
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    // Global logging interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // Global JWT auth guard
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
