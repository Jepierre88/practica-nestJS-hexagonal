import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  DomainException,
  InvalidTaskDescriptionException,
  InvalidTaskStatusTransitionException,
  InvalidTaskTitleException,
  TaskNotFoundException,
} from '@task/domain/exceptions/domain.exception';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = this.getHttpStatus(exception);

    response.status(status).json({
      statusCode: status,
      error: exception.name,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }

  private getHttpStatus(exception: DomainException): number {
    if (exception instanceof TaskNotFoundException) {
      return HttpStatus.NOT_FOUND;
    }
    if (exception instanceof InvalidTaskStatusTransitionException) {
      return HttpStatus.CONFLICT;
    }
    if (
      exception instanceof InvalidTaskTitleException ||
      exception instanceof InvalidTaskDescriptionException
    ) {
      return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.UNPROCESSABLE_ENTITY;
  }
}
