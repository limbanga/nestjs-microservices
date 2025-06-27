import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from '@app/contracts/task/dto/create-task.dto';
import { UpdateTaskDto } from '@app/contracts/task/dto/update-task.dto';

@Injectable()
export class TaskServiceService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async create(dto: CreateTaskDto) {
    const task = this.taskRepo.create(dto);
    return await this.taskRepo.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepo.find();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepo.findOneBy({ id });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, dto: UpdateTaskDto) {
    const task = await this.findOne(id);
    Object.assign(task, dto);
    return await this.taskRepo.save(task);
  }

  async delete(id: string) {
    const task = await this.findOne(id);
    return await this.taskRepo.remove(task);
  }
}
