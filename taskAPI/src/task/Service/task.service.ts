import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskDto } from '../../task/Dto/task.dto';
import { Taskschema as Task } from '../../task/Entities/task.entity';
import { Like, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async getByTitle(name: string) {
    return await this.taskRepository.find({
      where: {
        title: Like(`%${name}%`),
      },
    });
  }
  async getByStatus(status:boolean){
    return await this.taskRepository.find({
      where: {
        status
      },
    });
  }
  async getAll() {
    return await this.taskRepository.find();
  }
  async getTask(id: number): Promise<Task> {
    return await this.taskRepository.findOneBy({ id });
  }

  async update(id: number, data: TaskDto): Promise<UpdateResult> {
    const Task = this.transform(data);
    if (Task.status) Task.finishedAt = new Date();
    return await this.taskRepository.update({ id }, Task);
  }
  async create(data: TaskDto): Promise<Task> {
    const Task = this.transform(data);
    const createdtask = this.taskRepository.create(Task);
    return this.taskRepository.save(createdtask);
  }

  async delete(id: number) {
    return await this.taskRepository.delete(id);
  }
  private transform(TaskDto: TaskDto): Task {
    const task = new Task();
    task.title = TaskDto.title;
    task.description = TaskDto.description;
    task.status = TaskDto.status;
    return task;
  }
}
