import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from '@shared/infrastructure/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  // ─── OpenAPI + Scalar ──────────────────────────────────────
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Hexagonal NestJS API')
    .setDescription(
      'API REST con arquitectura hexagonal — Tasks, Users, Auth, Program Languages',
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .addTag('Auth', 'Autenticación y JWT')
    .addTag('Users', 'Gestión de usuarios')
    .addTag('Tasks', 'Gestión de tareas')
    .addTag('Program Languages', 'Lenguajes de programación')
    .addTag('CS2 - Weapons', 'Armas de CS2')
    .addTag('CS2 - Skins', 'Skins de armas')
    .addTag('CS2 - Collections', 'Colecciones de skins')
    .addTag('CS2 - Cases', 'Cajas y apertura de cajas')
    .addTag('CS2 - Openings', 'Historial de aperturas')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  app.use(
    '/api/reference',
    apiReference({
      spec: { content: document },
      theme: 'kepler',
    }),
  );

  await app.listen(config.get<number>('PORT', 3000));
}
void bootstrap();
