import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateTaskUseCase } from '@task/application/ports/in/create-task.port';
import { FindTasksUseCase } from '@task/application/ports/in/find-tasks.port';
import { UpdateTaskUseCase } from '@task/application/ports/in/update-task.port';
import { DeleteTaskUseCase } from '@task/application/ports/in/delete-task.port';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TaskResponseDto } from './dtos/task-response.dto';
import { UuidParam } from './dtos/uuid-param.dto';
import { TaskDtoMapper } from './mappers/task-dto.mapper';
import { ResponseMessage } from '@shared/infrastructure/decorators/response-message.decorator';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly findTasksUseCase: FindTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('Task created successfully')
  async create(@Body() dto: CreateTaskDto): Promise<TaskResponseDto> {
    const task = await this.createTaskUseCase.execute({
      title: dto.title,
      description: dto.description,
    });
    return TaskDtoMapper.toResponse(task);
  }

  @Get()
  @ResponseMessage('Tasks retrieved successfully')
  async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.findTasksUseCase.findAll();
    return TaskDtoMapper.toResponseList(tasks);
  }

  @Get(':id')
  @ResponseMessage('Task retrieved successfully')
  async findById(@Param() params: UuidParam): Promise<TaskResponseDto> {
    const task = await this.findTasksUseCase.findById(params.id);
    return TaskDtoMapper.toResponse(task);
  }

  @Put(':id')
  @ResponseMessage('Task updated successfully')
  async update(
    @Param() params: UuidParam,
    @Body() dto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    const task = await this.updateTaskUseCase.execute({
      id: params.id,
      title: dto.title,
      description: dto.description,
      status: dto.status,
    });
    return TaskDtoMapper.toResponse(task);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ResponseMessage('Task deleted successfully')
  async delete(@Param() params: UuidParam): Promise<void> {
    await this.deleteTaskUseCase.execute(params.id);
  }
}
