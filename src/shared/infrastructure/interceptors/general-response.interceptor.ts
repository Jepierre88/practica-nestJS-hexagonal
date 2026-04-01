import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { GeneralResponse } from '@shared/interfaces/general-response.interface';
import { RESPONSE_MESSAGE_KEY } from '@shared/infrastructure/decorators/response-message.decorator';

@Injectable()
export class GeneralResponseInterceptor<T>
  implements NestInterceptor<T, GeneralResponse<T>>
{
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<GeneralResponse<T>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    const message =
      this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler()) ??
      'Operation completed successfully';

    return next.handle().pipe(
      map((data) => ({
        success: true,
        statusCode,
        message,
        data,
      })),
    );
  }
}
