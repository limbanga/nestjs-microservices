import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from '@app/contracts/user/dto/register.dto';
import { LoginDto } from '@app/contracts/user/dto/login.dto';
import { UpdateUserDto } from '@app/contracts/user/dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'apps/api-gateway/common/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

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

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch('me')
    updateMe(@Req() req: any, @Body() dto: UpdateUserDto) {
        const userId = req.user.userId;
        return this.userService.update(userId, dto);
    }
}
