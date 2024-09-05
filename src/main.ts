import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { AllConfigType } from './config/config.type';
import { ResolvePromisesInterceptor } from './utils/serializer.interceptor';
import validationOptions from './utils/validation-options';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  /**
   * Получаем экземпляр ConfigService с типом AllConfigType,
   * который используется для доступа к конфигурационным параметрам приложения.
   */
  const configService = app.get(ConfigService<AllConfigType>);

  // Включаем хуки для корректного завершения работы приложения
  app.enableShutdownHooks();

  /**
   * Устанавливаем глобальный префикс для всех маршрутов API,
   * получая значение префикса из конфигурации.
   * Исключаем корневой маршрут ('/') из этого префикса.
   */
  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );

  /**
   * Включаем версионирование API, используя версионирование по URI.
   * Это позволяет управлять версиями API через URL (например, /v1/).
   */
  app.enableVersioning({
    type: VersioningType.URI,
  });

  /**
   * Устанавливаем глобальные пайпы для валидации данных,
   * используя ValidationPipe с заданными опциями валидации.
   */
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  //Устанавливаем глобальные перехватчики:
  app.useGlobalInterceptors(
    // ResolvePromisesInterceptor is used to resolve promises in responses because class-transformer can't do it
    // https://github.com/typestack/class-transformer/issues/549
    /**
     * используется для разрешения промисов в ответах,
     * так как class-transformer не может это сделать.
     */
    new ResolvePromisesInterceptor(),

    /**
     * ClassSerializerInterceptor используется для сериализации объектов
     * с помощью class-transformer.
     */
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  /**
   * Создаем объект DocumentBuilder для настройки документации Swagger,
   * устанавливая заголовок, описание, версию API и поддержку Bearer токенов для авторизации.
   */
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  /**
   * Создаем документ Swagger на основе настроек и приложения,
   * который будет использоваться для генерации документации API.
   */
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}

void bootstrap();
