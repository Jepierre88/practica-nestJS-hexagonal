import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from '@shared/exceptions/domain-error.exception';
import { DomainException } from '@task/domain/exceptions/domain.exception';
import { AuthDomainException } from '@auth/domain/exceptions/auth-domain.exception';

// ─── Domain exception → HTTP status mappings ────────────────

const NOT_FOUND_PATTERNS = ['NotFound', 'NotFoundException'];
const CONFLICT_PATTERNS = ['AlreadyExists', 'Conflict', 'InvalidStatusTransition'];
const UNAUTHORIZED_PATTERNS = ['InvalidCredentials'];

function mapDomainToHttpStatus(exception: Error): number {
  const name = exception.constructor.name;

  if (UNAUTHORIZED_PATTERNS.some((p) => name.includes(p))) return HttpStatus.UNAUTHORIZED;
  if (NOT_FOUND_PATTERNS.some((p) => name.includes(p))) return HttpStatus.NOT_FOUND;
  if (CONFLICT_PATTERNS.some((p) => name.includes(p))) return HttpStatus.CONFLICT;

  return HttpStatus.BAD_REQUEST;
}

// ─── Filter ─────────────────────────────────────────────────

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { statusCode, error, message } = this.resolveException(exception);

    response.status(statusCode).json({
      success: false,
      statusCode,
      message,
      data: {
        error,
      },
    });
  }

  private resolveException(exception: unknown): {
    statusCode: number;
    error: string;
    message: string;
  } {
    // Domain errors (DomainError, DomainException, AuthDomainException)
    if (
      exception instanceof DomainError ||
      exception instanceof DomainException ||
      exception instanceof AuthDomainException
    ) {
      return {
        statusCode: mapDomainToHttpStatus(exception),
        error: exception.name,
        message: exception.message,
      };
    }

    // NestJS HTTP exceptions (ValidationPipe, NotFoundException, etc.)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();
      const message =
        typeof res === 'string'
          ? res
          : (res as any).message ?? exception.message;

      return {
        statusCode: status,
        error: exception.name,
        message: Array.isArray(message) ? message.join('; ') : message,
      };
    }

    // Unknown errors
    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'InternalServerError',
      message: 'An unexpected error occurred.',
    };
  }
}
