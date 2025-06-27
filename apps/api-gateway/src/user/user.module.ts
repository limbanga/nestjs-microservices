import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from 'apps/api-gateway/common/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    {
      provide: 'USER_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('USER_SERVICE_HOST', 'localhost'),
            port: parseInt(configService.get('USER_SERVICE_PORT', '4000'), 10),
          },
        });
      },
    },
    UserService,
    JwtStrategy,
  ],
  controllers: [UserController],
})
export class UserModule {}
