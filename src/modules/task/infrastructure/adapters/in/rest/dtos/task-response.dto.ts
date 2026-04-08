import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  readonly id!: string;

  @ApiProperty({ example: 'Comprar leche' })
  readonly title!: string;

  @ApiProperty({ example: 'Ir al supermercado más cercano' })
  readonly description!: string;

  @ApiProperty({
    example: 'PENDING',
    enum: ['PENDING', 'IN_PROGRESS', 'DONE', 'CANCELLED'],
  })
  readonly status!: string;

  @ApiProperty({ example: '2026-01-15T10:30:00.000Z' })
  readonly createdAt!: string;

  @ApiProperty({ example: '2026-01-15T10:30:00.000Z' })
  readonly updatedAt!: string;

  constructor(props: {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.status = props.status;
    this.createdAt = props.createdAt.toISOString();
    this.updatedAt = props.updatedAt.toISOString();
  }
}
