export class UserResponseDto {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  description?: string;
  links?: any[];
  provider?: string;
  createdAt: Date;
  updatedAt: Date;
  publicMetadata: Record<string, any>;

  // Factory để chuyển từ entity sang DTO
  static fromEntity(user: any): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.email = user.email;
    dto.name = user.name;
    dto.avatar = user.avatar;
    dto.description = user.description;
    dto.links = user.links;
    dto.provider = user.provider;
    dto.createdAt = user.createdAt;
    dto.updatedAt = user.updatedAt;
    dto.publicMetadata = user.publicMetadata;
    return dto;
  }
}
