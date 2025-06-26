import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ProjectMessagePattern } from '@app/contracts/project/patterns';
import { CreateProjectDto } from '@app/contracts/project/dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('PROJECT_SERVICE') private readonly projectClient: ClientProxy,
  ) {}

  create(dto: CreateProjectDto) {
    return firstValueFrom(
      this.projectClient.send({ cmd: ProjectMessagePattern.CREATE }, dto),
    );
  }

  findAll() {
    return firstValueFrom(
      this.projectClient.send({ cmd: ProjectMessagePattern.FIND_ALL }, {}),
    );
  }

  findOne(id: string) {
    return firstValueFrom(
      this.projectClient.send({ cmd: ProjectMessagePattern.FIND_ONE }, id),
    );
  }

  update(id: string, dto: Partial<CreateProjectDto>) {
    return firstValueFrom(
      this.projectClient.send({ cmd: ProjectMessagePattern.UPDATE }, { id, dto }),
    );
  }

  delete(id: string) {
    return firstValueFrom(
      this.projectClient.send({ cmd: ProjectMessagePattern.DELETE }, id),
    );
  }
}
