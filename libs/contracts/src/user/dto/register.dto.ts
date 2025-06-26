import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'example@email.com',
    description: 'Địa chỉ email hợp lệ',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    minLength: 6,
    description: 'Mật khẩu ít nhất 6 ký tự',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'Nguyễn Văn A',
    description: 'Tên người dùng',
  })
  @IsString()
  name: string;
}
