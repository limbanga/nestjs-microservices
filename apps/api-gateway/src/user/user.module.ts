import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from 'apps/api-gateway/common/strategies/jwt.strategy';

@Module({
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: 4000, // Port của UserService
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
