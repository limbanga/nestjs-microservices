import { NestFactory } from '@nestjs/core';
import { ProjectServiceModule } from './project-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { log } from 'console';

async function bootstrap() {
 const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProjectServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 5000,
      },
    },
  );
  log('Project Service is running on port 5000');
  await app.listen();
}
bootstrap();
