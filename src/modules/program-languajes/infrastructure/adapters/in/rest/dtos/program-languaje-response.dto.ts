import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DifficultyLevel } from '@program-languajes/domain/value-objects/difficulty-level.vo';

export class ProgramLanguajeResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  readonly id: string;

  @ApiProperty({ example: 'TypeScript' })
  readonly name: string;

  @ApiPropertyOptional({ example: 'A typed superset of JavaScript' })
  readonly description?: string;

  @ApiPropertyOptional({
    enum: [1, 2, 3],
    description: '1=EASY, 2=MEDIUM, 3=HARD',
    example: 2,
  })
  readonly difficulty?: DifficultyLevel;

  @ApiProperty({ example: '2026-01-15T10:30:00.000Z' })
  readonly createdAt: string;

  @ApiProperty({ example: '2026-01-15T10:30:00.000Z' })
  readonly updatedAt: string;
}
