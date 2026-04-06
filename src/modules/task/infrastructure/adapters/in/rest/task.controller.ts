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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
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

@ApiTags('Tasks')
@ApiBearerAuth('JWT')
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly findTasksUseCase: FindTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly taskDtoMapper: TaskDtoMapper,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear tarea',
    description: 'Crea una nueva tarea con estado PENDING',
  })
  @ApiResponse({
    status: 201,
    description: 'Tarea creada',
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ResponseMessage('Task created successfully')
  async create(@Body() dto: CreateTaskDto): Promise<TaskResponseDto> {
    const task = await this.createTaskUseCase.execute({
      title: dto.title,
      description: dto.description,
    });
    return this.taskDtoMapper.toResponse(task);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar tareas',
    description: 'Obtiene todas las tareas',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tareas',
    type: [TaskResponseDto],
  })
  @ResponseMessage('Tasks retrieved successfully')
  async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.findTasksUseCase.findAll();
    return this.taskDtoMapper.toResponseList(tasks);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener tarea por ID' })
  @ApiParam({ name: 'id', description: 'UUID v4 de la tarea' })
  @ApiResponse({
    status: 200,
    description: 'Tarea encontrada',
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ResponseMessage('Task retrieved successfully')
  async findById(@Param() params: UuidParam): Promise<TaskResponseDto> {
    const task = await this.findTasksUseCase.findById(params.id);
    return this.taskDtoMapper.toResponse(task);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar tarea',
    description: 'Actualiza título, descripción o estado',
  })
  @ApiParam({ name: 'id', description: 'UUID v4 de la tarea' })
  @ApiResponse({
    status: 200,
    description: 'Tarea actualizada',
    type: TaskResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiResponse({ status: 409, description: 'Transición de estado inválida' })
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
    return this.taskDtoMapper.toResponse(task);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar tarea' })
  @ApiParam({ name: 'id', description: 'UUID v4 de la tarea' })
  @ApiResponse({ status: 204, description: 'Tarea eliminada' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ResponseMessage('Task deleted successfully')
  async delete(@Param() params: UuidParam): Promise<void> {
    await this.deleteTaskUseCase.execute(params.id);
  }
}
