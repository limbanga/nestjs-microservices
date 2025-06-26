import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '@app/contracts/user/dto/user-response.dto';
import { RegisterDto } from '@app/contracts/user/dto/register.dto';
import { LoginDto } from '@app/contracts/user/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '@app/contracts/user/dto/update-user.dto';

@Injectable()
export class UserServiceService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async register(dto: RegisterDto) {
    const exists = await this.userRepository.findOneBy({ email: dto.email });
    if (exists) throw new ConflictException('Email already exists');

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      email: dto.email,
      password: hashed,
      name: dto.name,
    });

    await this.userRepository.save(user);
    return { message: 'Register successful' };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOneBy({ email: dto.email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = await this.jwtService.signAsync({ sub: user.id, email: user.email });

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map(UserResponseDto.fromEntity);
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User not found`);
    return UserResponseDto.fromEntity(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
  const user = await this.userRepository.findOneBy({ id });
  if (!user) throw new NotFoundException('User not found');

  Object.assign(user, dto);
  user.updatedAt = new Date();

  const updated = await this.userRepository.save(user);
  return UserResponseDto.fromEntity(updated);
}

}
