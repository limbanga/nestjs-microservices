import { Module } from '@nestjs/common';
import { TaskServiceController } from './task-service.controller';
import { TaskServiceService } from './task-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
        // Database config từ env
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            type: 'postgres',
            host: config.get('TASK_DB_HOST'),
            port: parseInt(config.get<string>('TASK_DB_PORT') || '5432'),
            username: config.get('TASK_DB_USERNAME'),
            password: config.get('TASK_DB_PASSWORD'),
            database: config.get('TASK_DB_NAME'),
            entities: [Task],
            synchronize: true,
          }),
        }),
    
        TypeOrmModule.forFeature([Task]),
  ],
  controllers: [TaskServiceController],
  providers: [TaskServiceService],
})
export class TaskServiceModule {}
