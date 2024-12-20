import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT_BACKEND', 3001);
  const cors = configService.get<string>('URL_FRONTEND') || 'http://localhost:3000';

  app.enableCors({
    origin: ['https://www.fzsallround.nl', 'https://fzsallround.nl', configService.get('URL_FRONTEND') || 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'X-Requested-With', 
      'Accept', 
      'Origin'
    ],
  });

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({
      transform: true,
  }));

  // const limiter = rateLimit({
  //   windowMs: 60 * 60 * 1000,
  //   max: 3,
  //   message: 'Too many requests from this IP, please try again later.',
  // });
  // app.use(limiter);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  await app.listen(port).catch(() => {
      console.log(`listen to ${port} failed`);
      process.exit(1);
  });
}
bootstrap();
