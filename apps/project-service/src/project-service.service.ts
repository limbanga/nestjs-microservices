import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from '@app/contracts/project/dto/create-project.dto';

@Injectable()
export class ProjectServiceService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async create(dto: CreateProjectDto) {
    const project = this.projectRepo.create(dto);
    await this.projectRepo.save(project);
    return project;
  }

  async findAll() {
    return this.projectRepo.find();
  }

  async findOne(id: string) {
    const project = await this.projectRepo.findOneBy({ id });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(id: string, dto: Partial<CreateProjectDto>) {
    const result = await this.projectRepo.update({ id }, dto);
    if (result.affected === 0) throw new NotFoundException('Project not found');
    return this.findOne(id);
  }

  async delete(id: string) {
    const result = await this.projectRepo.delete({ id });
    if (result.affected === 0) throw new NotFoundException('Project not found');
    return { message: 'Deleted successfully' };
  }
}
