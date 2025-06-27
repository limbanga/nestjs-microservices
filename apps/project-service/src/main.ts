import { NestFactory } from '@nestjs/core';
import { ProjectServiceModule } from './project-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { log } from 'console';

// Load .env file trước khi bootstrap
config();

async function bootstrap() {
  const port = parseInt(process.env.PROJECT_SERVICE_PORT || '5000', 10);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProjectServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0', // dùng 0.0.0.0 để container truy cập được
        port,
      },
    },
  );

  await app.listen();
  log(`Project Service is running on port ${port}`);
}
bootstrap();
