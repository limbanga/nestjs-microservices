import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsInt,
  Matches,
} from 'class-validator';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { randomUUID } from 'crypto';

const ISO8601_REGEX =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-]\d{2}:\d{2}))$/;

export class CreateTaskDto {
  @ApiProperty({ description: 'Tiêu đề task' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: 'Mô tả task', default: '' })
  @IsOptional()
  @IsString()
  description?: string = '';

  @ApiProperty({
    description: 'ID project liên quan',
    default: randomUUID(),
  })
  @IsUUID()
  @IsNotEmpty()
  projectId: string = randomUUID();

  @ApiProperty({
    description: 'ID trạng thái hiện tại',
    default: randomUUID(),
  })
  @IsUUID()
  @IsNotEmpty()
  statusId: string = randomUUID();

  @ApiProperty({ description: 'Thứ tự trong status', default: 0 })
  @IsInt()
  @IsNotEmpty()
  statusPosition: number = 0;

  @ApiHideProperty()
  @IsUUID()
  @IsNotEmpty()
  createdBy: string = randomUUID();

  @ApiPropertyOptional({
    description: 'ID độ ưu tiên',
    default: randomUUID(),
  })
  @IsOptional()
  @IsUUID()
  priorityId?: string = randomUUID();

  @ApiPropertyOptional({
    description: 'Ngày bắt đầu (ISO 8601)',
    default: new Date().toISOString(),
  })
  @IsOptional()
  @Matches(ISO8601_REGEX, {
    message: 'startDate must be a valid ISO 8601 date string',
  })
  startDate?: string = new Date().toISOString();

  @ApiPropertyOptional({
    description: 'Ngày kết thúc (ISO 8601)',
    default: new Date().toISOString(),
  })
  @IsOptional()
  @Matches(ISO8601_REGEX, {
    message: 'endDate must be a valid ISO 8601 date string',
  })
  endDate?: string = new Date().toISOString();

  @ApiProperty({
    description: 'Ngày tạo task',
    example: new Date().toISOString(),
  })
  @Matches(ISO8601_REGEX, {
    message: 'createdAt must be a valid ISO 8601 date string',
  })
  @IsOptional()
  createdAt: string = new Date().toISOString();

  @ApiProperty({
    description: 'Ngày cập nhật task',
    example: new Date().toISOString(),
  })
  @Matches(ISO8601_REGEX, {
    message: 'updatedAt must be a valid ISO 8601 date string',
  })
  @IsOptional()
  updatedAt: string = new Date().toISOString();
}
