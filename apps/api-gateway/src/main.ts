import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { log } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  // Lấy biến từ .env
  const configService = app.get(ConfigService);
  const port = parseInt(configService.get('API_GATEWAY_PORT') || '3000', 10);
  
  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Gateway for microservices')
    .setVersion('1.0')
    .addBearerAuth() // Nếu dùng JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  log(`API Gateway is running on port ${port}`);
}
bootstrap();
