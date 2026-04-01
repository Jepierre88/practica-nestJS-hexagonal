import { IsUUID } from 'class-validator';

export class UuidParam {
  @IsUUID('4', { message: 'id must be a valid UUID v4' })
  readonly id!: string;
}
