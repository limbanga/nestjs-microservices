import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserServiceService } from './user-service.service';
import { RegisterDto } from '@app/contracts/user/dto/register.dto';
import { LoginDto } from '@app/contracts/user/dto/login.dto';
import { UserMessagePattern } from '@app/contracts/user/patterns';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) { }

  @MessagePattern({ cmd: UserMessagePattern.REGISTER })
  async register(@Payload() dto: RegisterDto) {
    return this.userServiceService.register(dto);
  }

  @MessagePattern({ cmd: UserMessagePattern.LOGIN })
  login(@Payload() dto: LoginDto) {
    return this.userServiceService.login(dto);
  }


  @MessagePattern({ cmd: UserMessagePattern.FIND_ALL })
  async findAll() {
    return this.userServiceService.findAll();
  }

  @MessagePattern({ cmd: UserMessagePattern.FIND_ONE })
  async findOne(@Payload() id: string) {
    return this.userServiceService.findOne(id);
  }
}
