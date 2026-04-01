import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UserDomainException, UserNotFoundException, UserAlreadyExistsException } from '@users/domain/exceptions/user-domain.exception';
import { AuthDomainException, InvalidCredentialsException, CredentialNotFoundException } from '@auth/domain/exceptions/auth-domain.exception';

type DomainError = UserDomainException | AuthDomainException;

@Catch(UserDomainException, AuthDomainException)
export class UserDomainExceptionFilter implements ExceptionFilter<DomainError> {
  catch(exception: DomainError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = this.mapToHttpStatus(exception);

    response.status(status).json({
      statusCode: status,
      error: exception.name,
      message: exception.message,
    });
  }

  private mapToHttpStatus(exception: DomainError): number {
    if (exception instanceof UserNotFoundException) return HttpStatus.NOT_FOUND;
    if (exception instanceof CredentialNotFoundException) return HttpStatus.NOT_FOUND;
    if (exception instanceof UserAlreadyExistsException) return HttpStatus.CONFLICT;
    if (exception instanceof InvalidCredentialsException) return HttpStatus.UNAUTHORIZED;
    return HttpStatus.BAD_REQUEST;
  }
}
