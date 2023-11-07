import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { Taskschema } from '../Entities/task.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TaskDto } from '../Dto/task.dto';

describe('TaskService', () => {
  let service: TaskService;
  let taskRepository: Repository<Taskschema>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    })
      .useMocker((token) => {
        if (token == 'TaskschemaRepository') {
          return {
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            save: jest.fn(),
          };
        }
      })
      .compile();

    service = module.get<TaskService>(TaskService);
    taskRepository = module.get('TaskschemaRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be get all task', async () => {
    //Arrange
    const taskList: Taskschema[] = [
      {
        id: 0,
        createdAt: new Date(),
        description: '',
        status: true,
        title: '',
      },
    ];
    jest.spyOn(taskRepository, 'find').mockResolvedValue(taskList);

    //Act
    const result = await service.getAll();

    //Assert
    expect(taskRepository.find).toHaveBeenCalled();
    expect(result).toEqual(taskList);
  });
  it('should be get a task', async () => {
    //Arrange
    const taskList: Taskschema = {
      id: 0,
      createdAt: new Date(),
      description: '',
      status: true,
      title: '',
    };
    jest.spyOn(taskRepository, 'findOneBy').mockResolvedValue(taskList);

    //Act
    const result = await service.getTask(taskList.id);

    //Assert
    expect(taskRepository.findOneBy).toHaveBeenCalledWith({ id: taskList.id });
    expect(result).toEqual(taskList);
  });
  it('should be create a task', async () => {
    //Arrange
    const taskList: Taskschema = {
      id: 0,
      createdAt: new Date(),
      description: '',
      status: true,
      title: '',
    };
    const taskDto: TaskDto = {
      description: '',
      status: true,
      title: '',
    };
    jest.spyOn(taskRepository, 'create').mockReturnValue(taskList);
    jest.spyOn(taskRepository, 'save').mockResolvedValue(taskList);
    //Act
    const result = await service.create(taskDto);

    //Assert
    expect(taskRepository.create).toHaveBeenCalled();
    expect(taskRepository.save).toHaveBeenCalledWith(taskList);
    expect(result).toEqual(taskList);
  });
  it('should be update a task', async () => {
    //Arrange
    const taskList: Taskschema = {
      id: 0,
      createdAt: new Date(),
      description: '',
      status: true,
      title: '',
    };
    const taskDto: TaskDto = {
      description: '',
      status: true,
      title: '',
    };
    const updateresult: UpdateResult = {
      raw: undefined,
      generatedMaps: [],
    };
    jest.spyOn(taskRepository, 'update').mockResolvedValue(updateresult);
    //Act
    const result = await service.update(taskList.id, taskDto);

    //Assert
    expect(taskRepository.update).toHaveBeenCalled();
    expect(result).toEqual(updateresult);
  });
  it('should be delete a task', async () => {
    //Arrange
    const taskList: Taskschema = {
      id: 0,
      createdAt: new Date(),
      description: '',
      status: true,
      title: '',
    };
    const deleteResult: DeleteResult = {
      raw: undefined,
      affected: undefined,
    };
    jest.spyOn(taskRepository, 'delete').mockResolvedValue(deleteResult);
    //Act
    const result = await service.delete(taskList.id);

    //Assert
    expect(taskRepository.delete).toHaveBeenCalled();
    expect(result).toEqual(deleteResult);
  });
});
