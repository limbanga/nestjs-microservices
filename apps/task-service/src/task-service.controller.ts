
import { TaskServiceService } from './task-service.service';
import { CreateTaskDto } from '@app/contracts/task/dto/create-task.dto';
import { UpdateTaskDto } from '@app/contracts/task/dto/update-task.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TaskMessagePattern } from '@app/contracts/task/patterns';
import { Controller } from '@nestjs/common';

@Controller()
export class TaskServiceController {
  constructor(private readonly taskServiceService: TaskServiceService) {}

  @MessagePattern({ cmd: TaskMessagePattern.CREATE })
  create(@Payload() dto: CreateTaskDto) {
    return this.taskServiceService.create(dto);
  }

  @MessagePattern({ cmd: TaskMessagePattern.FIND_ALL })
  findAll() {
    return this.taskServiceService.findAll();
  }

  @MessagePattern({ cmd: TaskMessagePattern.FIND_ONE })
  findOne(@Payload() id: string) {
    return this.taskServiceService.findOne(id);
  }

  @MessagePattern({ cmd: TaskMessagePattern.UPDATE })
  update(@Payload() payload: { id: string; dto: UpdateTaskDto }) {
    return this.taskServiceService.update(payload.id, payload.dto);
  }

  @MessagePattern({ cmd: TaskMessagePattern.DELETE })
  delete(@Payload() id: string) {
    return this.taskServiceService.delete(id);
  }
}
