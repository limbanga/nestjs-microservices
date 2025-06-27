import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { TaskMessagePattern } from '@app/contracts/task/patterns';
import { CreateTaskDto } from '@app/contracts/task/dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_SERVICE') private readonly taskClient: ClientProxy,
  ) {}

  create(dto: CreateTaskDto) {
    return firstValueFrom(
      this.taskClient.send({ cmd: TaskMessagePattern.CREATE }, dto),
    );
  }

  findAll() {
    return firstValueFrom(
      this.taskClient.send({ cmd: TaskMessagePattern.FIND_ALL }, {}),
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.taskClient.send({ cmd: TaskMessagePattern.FIND_ONE }, id),
    );
  }

  update(id: string, dto: Partial<CreateTaskDto>) {
    return firstValueFrom(
      this.taskClient.send({ cmd: TaskMessagePattern.UPDATE }, { id, dto }),
    );
  }

  delete(id: string) {
    return firstValueFrom(
      this.taskClient.send({ cmd: TaskMessagePattern.DELETE }, id),
    );
  }
}
