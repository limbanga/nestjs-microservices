import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from '@app/contracts/user/dto/register.dto';
import { LoginDto } from '@app/contracts/user/dto/login.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/register')
  register(@Body() dto: RegisterDto) {
    return this.userService.register(dto);
  }

  @Post('auth/login')
  login(@Body() dto: LoginDto) {
    return this.userService.login(dto);
  }

  @Get('users')
  findAll() {
    return this.userService.findAll();
  }

  @Get('users/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
