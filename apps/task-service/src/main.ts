import { NestFactory } from '@nestjs/core';
import { TaskServiceModule } from './task-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { log } from 'console';

async function bootstrap() {
const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TaskServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 6000,
      },
    },
  );
  log('Task Service is running on port 6000');
  await app.listen();
}
bootstrap();
