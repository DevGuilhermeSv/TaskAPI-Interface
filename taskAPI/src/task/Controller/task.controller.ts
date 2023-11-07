import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskDto } from '../../task/Dto/task.dto';
import { TaskService } from '../../task/Service/task.service';
import { Taskschema as Task } from '../../task/Entities/task.entity';
import { AuthGuard } from '../../auth/auth.guard';
import { query } from 'express';

@Controller('Task')
export class TaskController {
  private readonly taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }
  @UseGuards(AuthGuard)
  @Get()
  async getAllTask() {
    return await this.taskService.getAll();
  }
  @UseGuards(AuthGuard)
  @Get('/title')
  async getByTitle(@Query() params: any) {
    return await this.taskService.getByTitle(params.title);
  }
  @UseGuards(AuthGuard)
  @Get('/status')
  async getByStatus(@Query() params: any){
    let status:boolean = params.status == "true"?true:false
    return await this.taskService.getByStatus(params.status)
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async getTask(@Param('id') id: any): Promise<Task> {
    return await this.taskService.getTask(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createTask(@Body() TaskDto: TaskDto): Promise<Task> {
    return await this.taskService.create(TaskDto);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() taskDto: TaskDto) {
    return await this.taskService.update(parseInt(id), taskDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return await this.taskService.delete(parseInt(id));
  }
}
