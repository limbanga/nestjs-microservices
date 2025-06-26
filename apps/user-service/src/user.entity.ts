import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 64 })
  email: string;

  @Column({ length: 64, nullable: true })
  name: string;

  @Column({ length: 64 })
  password: string;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  links: any[];

  @Column({ type: 'text', nullable: true })
  provider: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'jsonb', default: {} })
  publicMetadata: Record<string, any>;
}
