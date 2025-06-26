import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterDto } from '@app/contracts/user/dto/register.dto';
import { LoginDto } from '@app/contracts/user/dto/login.dto';
import { UserMessagePattern } from '@app/contracts/user/patterns';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  register(dto: RegisterDto) {
    return firstValueFrom(
      this.userClient.send({ cmd: UserMessagePattern.REGISTER }, dto),
    );
  }

  login(dto: LoginDto) {
    return firstValueFrom(
      this.userClient.send({ cmd: UserMessagePattern.LOGIN }, dto),
    );
  }

  findAll() {
    return firstValueFrom(
      this.userClient.send({ cmd: UserMessagePattern.FIND_ALL }, {}),
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.userClient.send({ cmd: UserMessagePattern.FIND_ONE }, id),
    );
  }
}
