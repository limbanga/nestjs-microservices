import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { JwtStrategy } from 'apps/api-gateway/common/strategies/jwt.strategy';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    {
      provide: 'TASK_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('TASK_SERVICE_HOST', 'localhost'),
            port: parseInt(configService.get('TASK_SERVICE_PORT', '6000'), 10),
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
