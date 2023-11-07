import { Module } from '@nestjs/common';
import { TaskController } from './Controller/task.controller';
import { TaskService } from './Service/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taskschema } from './Entities/task.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Taskschema])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
