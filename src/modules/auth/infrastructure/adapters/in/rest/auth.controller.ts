import {
  Controller,
  Post,
  Body,
  UseFilters,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LoginUseCase } from '@auth/application/port/in/login.port';
import { LoginDto } from './dtos/login.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { AuthDomainExceptionFilter } from './filters/auth-domain-exception.filter';
import { Public } from './decorators/public.decorator';

@Controller('auth')
@UseFilters(AuthDomainExceptionFilter)
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    const result = await this.loginUseCase.execute({
      email: dto.email,
      password: dto.password,
    });
    return {
      accessToken: result.accessToken,
      userId: result.userId,
      email: result.email,
    };
  }
}