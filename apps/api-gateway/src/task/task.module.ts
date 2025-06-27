import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { JwtStrategy } from 'apps/api-gateway/common/strategies/jwt.strategy';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  providers: [
    {
      provide: 'TASK_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: 6000, // Task Service port
          },
        });
      },
    },
    TaskService,
    JwtStrategy,
  ],
  controllers: [TaskController],
})
export class TaskModule {}
