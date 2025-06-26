import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4000,
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [
    ApiGatewayService,
  ],

})
export class ApiGatewayModule { }
