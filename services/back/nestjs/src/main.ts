import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT_BACKEND', 3001);
  const domain = configService.get<string>('DOMAIN_NAME', 'localhost');
  const origin = [`https://www.${domain}`, `https://${domain}`, `http://localhost:${port}`];

  app.enableCors({
    origin: origin,
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
  app.useGlobalPipes(new ValidationPipe({transform: true,}));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  await app.listen(port).catch(() => {
      console.log(`listen to ${port} failed`);
      process.exit(1);
  });
}
bootstrap();
