// apps/task-service/src/task/task.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'uuid' })
  projectId: string;

  @Column({ type: 'uuid' })
  statusId: string;

  @Column({ type: 'int' })
  statusPosition: number;

  @Column({ type: 'uuid' })
  createdBy: string;

  @Column({ type: 'uuid', nullable: true })
  priorityId?: string;

  @Column({ type: 'timestamp', nullable: true })
  startDate?: string;

  @Column({ type: 'timestamp', nullable: true })
  endDate?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
