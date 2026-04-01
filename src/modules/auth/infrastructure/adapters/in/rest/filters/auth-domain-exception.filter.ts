import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthDomainException, InvalidCredentialsException, CredentialNotFoundException } from '@auth/domain/exceptions/auth-domain.exception';

@Catch(AuthDomainException)
export class AuthDomainExceptionFilter implements ExceptionFilter<AuthDomainException> {
  catch(exception: AuthDomainException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = this.mapToHttpStatus(exception);

    response.status(status).json({
      statusCode: status,
      error: exception.name,
      message: exception.message,
    });
  }

  private mapToHttpStatus(exception: AuthDomainException): number {
    if (exception instanceof InvalidCredentialsException) return HttpStatus.UNAUTHORIZED;
    if (exception instanceof CredentialNotFoundException) return HttpStatus.NOT_FOUND;
    return HttpStatus.BAD_REQUEST;
  }
}
