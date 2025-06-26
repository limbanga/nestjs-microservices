import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProjectServiceService } from './project-service.service';
import { CreateProjectDto } from '@app/contracts/project/dto/create-project.dto';
import { ProjectMessagePattern } from '@app/contracts/project/patterns';

@Controller()
export class ProjectServiceController {
  constructor(private readonly projectService: ProjectServiceService) {}

  @MessagePattern({ cmd: ProjectMessagePattern.CREATE })
  create(@Payload() dto: CreateProjectDto) {
    return this.projectService.create(dto);
  }

  @MessagePattern({ cmd: ProjectMessagePattern.FIND_ALL })
  findAll() {
    return this.projectService.findAll();
  }

  @MessagePattern({ cmd: ProjectMessagePattern.FIND_ONE })
  findOne(@Payload() id: string) {
    return this.projectService.findOne(id);
  }

  @MessagePattern({ cmd: ProjectMessagePattern.UPDATE })
  update(@Payload() payload: { id: string; dto: Partial<CreateProjectDto> }) {
    return this.projectService.update(payload.id, payload.dto);
  }

  @MessagePattern({ cmd: ProjectMessagePattern.DELETE })
  delete(@Payload() id: string) {
    return this.projectService.delete(id);
  }
}
