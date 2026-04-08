import { ApiProperty } from '@nestjs/swagger';

export class CaseOpenSkinDto {
  @ApiProperty({ example: 'uuid' })
  readonly skinId!: string;

  @ApiProperty({ example: 'Asiimov' })
  readonly skinName!: string;

  @ApiProperty({ example: 45.99 })
  readonly skinPrice!: number;

  @ApiProperty({ example: 0.15 })
  readonly skinFloat!: number;

  @ApiProperty({ example: 'AK-47' })
  readonly weaponName!: string;

  @ApiProperty({ example: 'Kilowatt Collection' })
  readonly collectionName!: string;

  @ApiProperty({ example: 25.5 })
  readonly dropRate!: number;
}

export class CaseOpenResultDto {
  @ApiProperty({ example: 'uuid', description: 'ID del opening creado' })
  readonly openingId!: string;

  @ApiProperty({ example: 'uuid' })
  readonly caseId!: string;

  @ApiProperty({ example: 'Kilowatt Case' })
  readonly caseName!: string;

  @ApiProperty({ example: 2.5 })
  readonly casePrice!: number;

  @ApiProperty({
    example: 5,
    description:
      'Índice del skin ganador en el array de skins (para animación del spinner)',
  })
  readonly winnerIndex!: number;

  @ApiProperty({ type: CaseOpenSkinDto, description: 'Skin ganado' })
  readonly winner!: CaseOpenSkinDto;

  @ApiProperty({
    type: [CaseOpenSkinDto],
    description: 'Todos los skins de la caja (para renderizar el carrusel)',
  })
  readonly skins!: CaseOpenSkinDto[];
}
