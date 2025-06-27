import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    ProjectModule,
    TaskModule,
  ],
  controllers: [ApiGatewayController],
  providers: [
    ApiGatewayService,
  ],

})
export class ApiGatewayModule { }
