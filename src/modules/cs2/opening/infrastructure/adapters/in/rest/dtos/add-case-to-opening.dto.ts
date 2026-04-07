import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCaseToOpeningDto {
  @ApiProperty({ example: 'uuid', description: 'ID de la caja' })
  @IsNotEmpty()
  @IsUUID()
  readonly caseId: string;

  @ApiProperty({ example: 'uuid', description: 'ID del skin resultado' })
  @IsNotEmpty()
  @IsUUID()
  readonly resultSkinId: string;
}
