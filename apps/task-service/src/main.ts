// apps/task-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { TaskServiceModule } from './task-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { log } from 'console';

// Load .env trước khi tạo app
config();

async function bootstrap() {
  const port = parseInt(process.env.TASK_SERVICE_PORT || '6000', 10);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TaskServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port,
      },
    },
  );

  await app.listen();
  log(`Task Service is running on port ${port}`);
}
bootstrap();
