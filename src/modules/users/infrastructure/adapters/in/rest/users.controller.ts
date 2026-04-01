import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RegisterUserUseCase } from '@users/application/ports/in/register-user.port';
import { FindUsersUseCase } from '@users/application/ports/in/find-users.port';
import { UpdateUserUseCase } from '@users/application/ports/in/update-user.port';
import { DeleteUserUseCase } from '@users/application/ports/in/delete-user.port';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UuidParam } from './dtos/uuid-param.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { UserDtoMapper } from './mappers/user-dto.mapper';
import { Public } from '@auth/infrastructure/adapters/in/rest/decorators/public.decorator';
import { CreateUserCommand } from '@users/application/commands/create-user.command';
import { ResponseMessage } from '@shared/infrastructure/decorators/response-message.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly findUsers: FindUsersUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage('User registered successfully')
  async register(@Body() dto: RegisterUserDto): Promise<UserResponseDto> {
    const user = await this.registerUser.execute(CreateUserCommand.create(dto));
    return UserDtoMapper.toResponse(user);
  }

  @Get()
  @ResponseMessage('Users retrieved successfully')
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.findUsers.findAll();
    return users.map(UserDtoMapper.toResponse);
  }

  @Get(':id')
  @ResponseMessage('User retrieved successfully')
  async findById(@Param() params: UuidParam): Promise<UserResponseDto> {
    const user = await this.findUsers.findById(params.id);
    return UserDtoMapper.toResponse(user);
  }

  @Put(':id')
  @ResponseMessage('User updated successfully')
  async update(
    @Param() params: UuidParam,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.updateUser.execute(params.id, {
      name: dto.name,
      lastName: dto.lastName,
      email: dto.email,
    });
    return UserDtoMapper.toResponse(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ResponseMessage('User deleted successfully')
  async remove(@Param() params: UuidParam): Promise<void> {
    await this.deleteUser.execute(params.id);
  }
}