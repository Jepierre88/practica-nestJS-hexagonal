import { ApiProperty } from '@nestjs/swagger';

export class SkinWeaponResponseDto {
  @ApiProperty({ example: 'uuid' })
  readonly id!: string;

  @ApiProperty({ example: 'AK-47' })
  readonly name!: string;
}

export class SkinCollectionResponseDto {
  @ApiProperty({ example: 'uuid' })
  readonly id!: string;

  @ApiProperty({ example: 'Kilowatt Collection' })
  readonly name!: string;
}

export class SkinResponseDto {
  @ApiProperty({ example: 'uuid' })
  readonly id!: string;

  @ApiProperty({ example: 'Asiimov' })
  readonly name!: string;

  @ApiProperty({ example: 45.99 })
  readonly price!: number;

  @ApiProperty({ example: 0.15 })
  readonly skinFloat!: number;

  @ApiProperty({ type: SkinWeaponResponseDto })
  readonly weapon!: SkinWeaponResponseDto;

  @ApiProperty({ type: SkinCollectionResponseDto })
  readonly collection!: SkinCollectionResponseDto;

  @ApiProperty()
  readonly createdAt!: Date;

  @ApiProperty()
  readonly updatedAt!: Date;

  constructor(props: SkinResponseDto) {
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
    this.skinFloat = props.skinFloat;
    this.weapon = props.weapon;
    this.collection = props.collection;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
