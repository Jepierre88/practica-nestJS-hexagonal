import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddSkinToCaseDto {
  @ApiProperty({ example: 'uuid', description: 'ID del skin a agregar' })
  @IsNotEmpty()
  @IsUUID()
  readonly skinId: string;
}
