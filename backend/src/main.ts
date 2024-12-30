import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('API TravelMate')
    .setDescription('Documentation de l\'API TravelMate')
    .setVersion('1.0')
    .addTag('voyage')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(3000);
}
bootstrap();