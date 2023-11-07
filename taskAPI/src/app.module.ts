import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { Taskschema } from './task/Entities/task.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'root',
      password: 'example',
      database: 'task',
      entities: [Taskschema, User],
      migrations: ['./src/Infrastructure/Migrations'],
      synchronize: true,
    }),
    TaskModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
