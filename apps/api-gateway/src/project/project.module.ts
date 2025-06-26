import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { JwtStrategy } from 'apps/api-gateway/common/strategies/jwt.strategy';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';

@Module({
  providers: [
    {
      provide: 'PROJECT_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: 5000,
          },
        });
      },
    },
    ProjectService,
    JwtStrategy,
  ],
  controllers: [ProjectController],
})
export class ProjectModule { }
