import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Servir archivos estáticos de uploads
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  const configService = app.get(ConfigService);

  // CORS: acepta desarrollo local y los dominios de producción en Vercel
  const corsOrigin = configService.get<string>('CORS_ORIGIN');
  const allowedOrigins = corsOrigin
    ? corsOrigin.split(',').map((o) => o.trim())
    : [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://consultorio-tordoya.vercel.app',
        'https://tordoya.vercel.app',
      ];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = configService.get<number>('PORT') || 5000;

  await app.listen(port);

  console.log(`Backend running on http://localhost:${port}`);
  console.log(`CORS enabled for: ${allowedOrigins.join(', ')}`);
}
bootstrap();
