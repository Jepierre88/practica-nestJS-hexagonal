import { ApiProperty } from '@nestjs/swagger';

export class CaseSkinResponseDto {
  @ApiProperty({ example: 'uuid' })
  readonly skinId: string;

  @ApiProperty({ example: 'Asiimov' })
  readonly skinName: string;

  @ApiProperty({ example: 25.5 })
  readonly dropRate: number;
}

export class CaseResponseDto {
  @ApiProperty({ example: 'uuid' })
  readonly id: string;

  @ApiProperty({ example: 'Kilowatt Case' })
  readonly name: string;

  @ApiProperty({ example: 2.50 })
  readonly price: number;

  @ApiProperty({ type: [CaseSkinResponseDto] })
  readonly skins: CaseSkinResponseDto[];

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor(props: CaseResponseDto) {
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
    this.skins = props.skins;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
