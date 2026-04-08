import { IsUUID } from 'class-validator';

export class UuidParam {
  @IsUUID()
  readonly id!: string;
}
