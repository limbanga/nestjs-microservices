import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectServiceController } from './project-service.controller';
import { ProjectServiceService } from './project-service.service';
import { Project } from './project.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('PROJECT_DB_HOST'),
        port: config.get<number>('PROJECT_DB_PORT'),
        username: config.get<string>('PROJECT_DB_USERNAME'),
        password: config.get<string>('PROJECT_DB_PASSWORD'),
        database: config.get<string>('PROJECT_DB_NAME'),
        entities: [Project],
        synchronize: true, // dùng cho dev, không dùng production
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Project]),
  ],
  controllers: [ProjectServiceController],
  providers: [ProjectServiceService],
})
export class ProjectServiceModule {}
