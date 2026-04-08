import { ApiProperty } from '@nestjs/swagger';

export class WeaponResponseDto {
  @ApiProperty({ example: 'a1b2c3d4-...' })
  readonly id!: string;

  @ApiProperty({ example: 'AK-47' })
  readonly name!: string;

  @ApiProperty()
  readonly createdAt!: Date;

  @ApiProperty()
  readonly updatedAt!: Date;

  constructor(props: WeaponResponseDto) {
    this.id = props.id;
    this.name = props.name;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
