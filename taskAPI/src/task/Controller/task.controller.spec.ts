import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from '../Service/task.service';
import { JwtService } from '@nestjs/jwt';
import { TaskDto } from '../Dto/task.dto';
import { Taskschema } from '../Entities/task.entity';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService, JwtService],
    })
      .useMocker((token) => {
        if (token == 'TaskschemaRepository') {
          return {
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
          };
        }
      })
      .compile();

    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });
  it('should delete a task by ID', async () => {
    // Arrange
    const taskId = '1';
    jest.spyOn(taskService, 'delete').mockResolvedValue(undefined);

    // Act
    const result = await taskController.deleteTask(taskId);

    // Assert
    expect(result).toBeUndefined();
  });
  it('should update a task by ID', async () => {
    // Arrange
    const taskId = '1';
    const taskDto = new TaskDto();
    jest.spyOn(taskService, 'update').mockResolvedValue(undefined);

    // Act
    const result = await taskController.updateTask(taskId, taskDto);

    // Assert
    expect(result).toBeUndefined();
  });
  it('should create a task', async () => {
    // Arrange
    const taskDto = new TaskDto(/* Provide necessary properties for TaskDto */);
    const mockTask = new Taskschema();
    jest.spyOn(taskService, 'create').mockResolvedValue(mockTask);

    // Act
    const result = await taskController.createTask(taskDto);

    // Assert
    expect(result).toEqual(mockTask);
  });
  it('should return a task by ID', async () => {
    // Arrange
    const taskId = 1;
    const mockTask = new Taskschema();
    jest.spyOn(taskService, 'getTask').mockResolvedValue(mockTask);

    // Act
    const result = await taskController.getTask(taskId);

    // Assert
    expect(result).toEqual(mockTask);
  });
  it('should return an array of tasks', async () => {
    // Arrange
    const mockTasks: Taskschema[] = [];
    jest.spyOn(taskService, 'getAll').mockResolvedValue(mockTasks);

    // Act
    const result = await taskController.getAllTask();

    // Assert
    expect(result).toEqual(mockTasks);
  });
});
