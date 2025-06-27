// apps/user-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { log } from 'console';
import { config } from 'dotenv';
import { UserServiceModule } from './user-service.module';

// Load biến môi trường từ .env
config();

async function bootstrap() {
  const port = parseInt(process.env.USER_SERVICE_PORT || '4000', 10);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port,
      },
    },
  );

  await app.listen();
  log(`User Service is running on port ${port}`);
}
bootstrap();
