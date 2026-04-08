import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AssignSubscriptionUseCase } from '@enterprise/application/ports/in/assign-subscription.usecase';
import { ChangeSubscriptionUseCase } from '@enterprise/application/ports/in/change-subscription.usecase';
import { AssignSubscriptionDto } from './dtos/assign-subscription.dto';
import { ChangeSubscriptionDto } from './dtos/change-subscription.dto';
import { ChangeSubscriptionCommand } from '@enterprise/application/commands/change-subscription.command';
import { ResponseMessage } from '@shared/infrastructure/decorators/response-message.decorator';
import { AssignSubscriptionCommand } from '@enterprise/application/commands/assign-subscription.command';

@ApiTags('Enterprise')
@ApiBearerAuth('JWT')
@Controller('enterprise')
export class EnterpriseController {
  constructor(
    @Inject(AssignSubscriptionUseCase)
    private readonly assignSubscriptionUseCase: AssignSubscriptionUseCase,
    @Inject(ChangeSubscriptionUseCase)
    private readonly changeSubscriptionUseCase: ChangeSubscriptionUseCase,
  ) {}

  @Post('assign-subscription')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Asignar suscripción a usuario',
    description: 'Asigna una suscripción existente a un usuario',
  })
  @ApiResponse({ status: 200, description: 'Suscripción asignada' })
  @ApiResponse({
    status: 404,
    description: 'Usuario o suscripción no encontrada',
  })
  @ResponseMessage('Subscription assigned successfully')
  async assignSubscription(@Body() dto: AssignSubscriptionDto): Promise<void> {
    const command: AssignSubscriptionCommand = dto;
    await this.assignSubscriptionUseCase.execute(command);
  }

  @Patch('change-subscription')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Cambiar plan de suscripción',
    description: 'Cambia el plan de suscripción de un usuario',
  })
  @ApiResponse({ status: 200, description: 'Plan cambiado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 400, description: 'Plan inválido' })
  @ResponseMessage('Subscription changed successfully')
  async changeSubscription(@Body() dto: ChangeSubscriptionDto): Promise<void> {
    const command: ChangeSubscriptionCommand = {
      userId: dto.userId,
      newPlan: dto.newPlan,
    };
    await this.changeSubscriptionUseCase.execute(command);
  }
}
