// contracts/user/dto/update-user.dto.ts
import { IsOptional, IsString, IsArray, IsObject } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Nguyễn Văn B' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.png' })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiPropertyOptional({ example: 'Giới thiệu ngắn' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: [{ label: 'Facebook', url: 'https://fb.com/abc' }] })
  @IsArray()
  @IsOptional()
  links?: any[];

  @ApiPropertyOptional({ example: 'google' })
  @IsString()
  @IsOptional()
  provider?: string;

  @ApiPropertyOptional({ example: { role: 'user', verified: true } })
  @IsObject()
  @IsOptional()
  publicMetadata?: Record<string, any>;
}
