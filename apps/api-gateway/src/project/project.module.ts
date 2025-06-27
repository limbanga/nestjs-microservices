import { Module, Logger } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { JwtStrategy } from 'apps/api-gateway/common/strategies/jwt.strategy';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    {
      provide: 'PROJECT_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get('PROJECT_SERVICE_HOST', 'localhost');
        const port = parseInt(configService.get('PROJECT_SERVICE_PORT', '5000'), 10);

        Logger.log(`Connecting to PROJECT_SERVICE at ${host}:${port}`, 'ProjectModule');

        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host,
            port,
          },
        });
      },
    },
    ProjectService,
    JwtStrategy,
  ],
  controllers: [ProjectController],
})
export class ProjectModule {}
