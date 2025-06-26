import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  readme: string;

  @Column({ type: 'uuid' })
  createdBy: string; // ID của user

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  closed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  startDate: string;

  @Column({ type: 'timestamp', nullable: true })
  endDate: string;

  @Column({ type: 'uuid' })
  researchField: string; // ID của research field

  @Column({ type: 'text', nullable: true })
  objectives: string;

  @Column({ type: 'int', nullable: true })
  budget: number;
}
