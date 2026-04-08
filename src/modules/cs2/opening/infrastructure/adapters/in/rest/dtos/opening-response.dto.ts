import { ApiProperty } from '@nestjs/swagger';

export class OpeningCaseResponseDto {
  @ApiProperty({ example: 'uuid' })
  readonly caseId!: string;

  @ApiProperty({ example: 'Kilowatt Case' })
  readonly caseName!: string;

  @ApiProperty({ example: 2.5 })
  readonly casePrice!: number;

  @ApiProperty({ example: 'uuid' })
  readonly resultSkinId!: string;

  @ApiProperty({ example: 'Asiimov' })
  readonly resultSkinName!: string;
}

export class OpeningResponseDto {
  @ApiProperty({ example: 'uuid' })
  readonly id!: string;

  @ApiProperty({ example: 'Kilowatt Case Opening' })
  readonly name!: string;

  @ApiProperty({ type: [OpeningCaseResponseDto] })
  readonly cases!: OpeningCaseResponseDto[];

  @ApiProperty()
  readonly createdAt!: Date;

  @ApiProperty()
  readonly updatedAt!: Date;

  constructor(props: OpeningResponseDto) {
    this.id = props.id;
    this.name = props.name;
    this.cases = props.cases;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
