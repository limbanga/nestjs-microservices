import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { User } from './user.entity';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Database config từ env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('USER_DB_HOST'),
        port: parseInt(config.get<string>('USER_DB_PORT') || '5432'),
        username: config.get('USER_DB_USERNAME'),
        password: config.get('USER_DB_PASSWORD'),
        database: config.get('USER_DB_NAME'),
        entities: [User],
        synchronize: true,
      }),
    }),

    TypeOrmModule.forFeature([User]),

    // JWT config từ env
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserServiceController],
  providers: [UserServiceService],
})
export class UserServiceModule { }
