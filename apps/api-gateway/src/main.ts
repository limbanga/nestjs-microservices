import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Gateway for microservices')
    .setVersion('1.0')
    .addBearerAuth() // Nếu dùng JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
