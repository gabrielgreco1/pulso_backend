import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

/**
 * Bootstrap the NestJS application
 * Configures CORS, validation, and starts the server
 */
async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // Log all environment variables immediately (debug)
  console.log('[DEBUG] ===== ENVIRONMENT VARIABLES =====');
  console.log('[DEBUG] Available env keys:', Object.keys(process.env).sort());
  console.log('[DEBUG] MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
  console.log('[DEBUG] NODE_ENV:', process.env.NODE_ENV);
  console.log('[DEBUG] =====================================');

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port')!;
  const nodeEnv = configService.get<string>('app.nodeEnv')!;
  const frontendUrl = configService.get<string>('app.frontendUrl') || 'http://localhost:3000';

  // Enable CORS for frontend
  const corsOrigins = [
    'http://localhost:3000',
    'http://frontend:3000',
    frontendUrl, // Add production frontend URL
  ];

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global prefix for all routes
  app.setGlobalPrefix('api');

  await app.listen(port);

  logger.log(`🚀 Application running in ${nodeEnv} mode on port ${port}`);
  logger.log(`📡 API available at: http://localhost:${port}/api`);
  logger.log(`🔐 CORS enabled for: http://localhost:3000`);
}

bootstrap();
