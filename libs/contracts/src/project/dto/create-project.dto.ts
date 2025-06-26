import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsBoolean,
  IsDateString,
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

export class CreateProjectDto {
  @ApiProperty({ description: 'Tên của project' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Mô tả ngắn gọn', default: '' })
  @IsOptional()
  @IsString()
  description?: string = '';

  @ApiPropertyOptional({ description: 'Nội dung file README', default: '' })
  @IsOptional()
  @IsString()
  readme?: string = '';

  @ApiHideProperty() // Lấy từ token JWT
  @IsUUID()
  createdBy: string = randomUUID();

  @ApiProperty({
    description: 'ID của lĩnh vực nghiên cứu (UUID)',
    default: randomUUID(),
  })
  @IsUUID()
  researchField: string = randomUUID();

  @ApiPropertyOptional({ description: 'Project đã đóng hay chưa', default: false })
  @IsOptional()
  @IsBoolean()
  closed?: boolean = false;

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

  @ApiPropertyOptional({ description: 'Mục tiêu của project', default: '' })
  @IsOptional()
  @IsString()
  objectives?: string = '';

  @ApiPropertyOptional({ description: 'Ngân sách dự kiến', default: 0 })
  @IsOptional()
  @IsInt()
  budget?: number = 0;
}
