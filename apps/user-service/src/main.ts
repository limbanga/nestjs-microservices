import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { log } from 'console';
import { UserServiceModule } from './user-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 4000,
      },
    },
  );
  log('User Service is running on port 4000');
  await app.listen();
}
bootstrap();
