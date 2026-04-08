import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Seeder } from './seeder.interface';
import { WeaponOrmEntity } from '@cs2/weapon/infrastructure/adapters/out/persistence/typeorm/entities/weapon-orm.entity';
import { CollectionOrmEntity } from '@cs2/collection/infrastructure/adapters/out/persistence/typeorm/entities/collection-orm.entity';
import { SkinOrmEntity } from '@cs2/skin/infrastructure/adapters/out/persistence/typeorm/entities/skin-orm.entity';

export class Cs2Seeder implements Seeder {
  readonly name = 'Cs2Seeder';

  async run(dataSource: DataSource): Promise<void> {
    const weaponRepo = dataSource.getRepository(WeaponOrmEntity);
    const collectionRepo = dataSource.getRepository(CollectionOrmEntity);
    const skinRepo = dataSource.getRepository(SkinOrmEntity);

    const weaponCount = await weaponRepo.count();
    if (weaponCount > 0) {
      console.log(`  ⏭  ${this.name}: tablas ya tienen datos, saltando.`);
      return;
    }

    // ── Weapons ──
    const weapons: Partial<WeaponOrmEntity>[] = [
      { id: uuidv4(), name: 'AK-47' },
      { id: uuidv4(), name: 'M4A4' },
      { id: uuidv4(), name: 'M4A1-S' },
      { id: uuidv4(), name: 'AWP' },
      { id: uuidv4(), name: 'Desert Eagle' },
      { id: uuidv4(), name: 'USP-S' },
      { id: uuidv4(), name: 'Glock-18' },
      { id: uuidv4(), name: 'P250' },
      { id: uuidv4(), name: 'FAMAS' },
      { id: uuidv4(), name: 'Galil AR' },
      { id: uuidv4(), name: 'SSG 08' },
      { id: uuidv4(), name: 'SG 553' },
      { id: uuidv4(), name: 'AUG' },
      { id: uuidv4(), name: 'MAC-10' },
      { id: uuidv4(), name: 'MP9' },
      { id: uuidv4(), name: 'UMP-45' },
      { id: uuidv4(), name: 'P90' },
      { id: uuidv4(), name: 'Nova' },
      { id: uuidv4(), name: 'XM1014' },
      { id: uuidv4(), name: 'Negev' },
    ];
    const savedWeapons = await weaponRepo.save(weapons);
    console.log(`  ✅ ${this.name}: ${savedWeapons.length} armas insertadas.`);

    const weaponMap = new Map(savedWeapons.map((w) => [w.name, w.id]));

    // ── Collections ──
    const collections: Partial<CollectionOrmEntity>[] = [
      { id: uuidv4(), name: 'Kilowatt Collection' },
      { id: uuidv4(), name: 'Revolution Collection' },
      { id: uuidv4(), name: 'Recoil Collection' },
      { id: uuidv4(), name: 'Dreams & Nightmares Collection' },
      { id: uuidv4(), name: 'Operation Riptide Collection' },
      { id: uuidv4(), name: 'Fracture Collection' },
      { id: uuidv4(), name: 'Snakebite Collection' },
      { id: uuidv4(), name: 'Clutch Collection' },
      { id: uuidv4(), name: 'Spectrum Collection' },
      { id: uuidv4(), name: 'Gamma Collection' },
    ];
    const savedCollections = await collectionRepo.save(collections);
    console.log(
      `  ✅ ${this.name}: ${savedCollections.length} colecciones insertadas.`,
    );

    const collMap = new Map(savedCollections.map((c) => [c.name, c.id]));

    // ── Skins ──
    // Variedad de precios: baratas (< $5), medias ($5-$50), caras ($50-$500), muy caras (> $500)
    const skins: Partial<SkinOrmEntity>[] = [
      // ── Kilowatt Collection ──
      {
        id: uuidv4(),
        name: 'AK-47 | Inheritance',
        price: 850.0,
        skinFloat: 0.07123456,
        weaponId: weaponMap.get('AK-47')!,
        collectionId: collMap.get('Kilowatt Collection')!,
      },
      {
        id: uuidv4(),
        name: 'M4A1-S | Black Lotus',
        price: 420.0,
        skinFloat: 0.03456789,
        weaponId: weaponMap.get('M4A1-S')!,
        collectionId: collMap.get('Kilowatt Collection')!,
      },
      {
        id: uuidv4(),
        name: 'USP-S | Jawbreaker',
        price: 12.5,
        skinFloat: 0.15234567,
        weaponId: weaponMap.get('USP-S')!,
        collectionId: collMap.get('Kilowatt Collection')!,
      },
      {
        id: uuidv4(),
        name: 'Glock-18 | Block-18',
        price: 8.3,
        skinFloat: 0.22345678,
        weaponId: weaponMap.get('Glock-18')!,
        collectionId: collMap.get('Kilowatt Collection')!,
      },

      // ── Revolution Collection ──
      {
        id: uuidv4(),
        name: 'M4A4 | Temukau',
        price: 180.0,
        skinFloat: 0.05678901,
        weaponId: weaponMap.get('M4A4')!,
        collectionId: collMap.get('Revolution Collection')!,
      },
      {
        id: uuidv4(),
        name: 'AK-47 | Head Shot',
        price: 35.0,
        skinFloat: 0.12345678,
        weaponId: weaponMap.get('AK-47')!,
        collectionId: collMap.get('Revolution Collection')!,
      },
      {
        id: uuidv4(),
        name: 'AWP | Chromatic Aberration',
        price: 95.0,
        skinFloat: 0.01234567,
        weaponId: weaponMap.get('AWP')!,
        collectionId: collMap.get('Revolution Collection')!,
      },
      {
        id: uuidv4(),
        name: 'P250 | Re.built',
        price: 1.8,
        skinFloat: 0.35678901,
        weaponId: weaponMap.get('P250')!,
        collectionId: collMap.get('Revolution Collection')!,
      },

      // ── Recoil Collection ──
      {
        id: uuidv4(),
        name: 'AK-47 | Ice Coaled',
        price: 55.0,
        skinFloat: 0.08901234,
        weaponId: weaponMap.get('AK-47')!,
        collectionId: collMap.get('Recoil Collection')!,
      },
      {
        id: uuidv4(),
        name: 'USP-S | Printstream',
        price: 320.0,
        skinFloat: 0.00987654,
        weaponId: weaponMap.get('USP-S')!,
        collectionId: collMap.get('Recoil Collection')!,
      },
      {
        id: uuidv4(),
        name: 'Desert Eagle | Ocean Drive',
        price: 18.0,
        skinFloat: 0.0456789,
        weaponId: weaponMap.get('Desert Eagle')!,
        collectionId: collMap.get('Recoil Collection')!,
      },
      {
        id: uuidv4(),
        name: 'MAC-10 | Monkeyflage',
        price: 0.75,
        skinFloat: 0.45678901,
        weaponId: weaponMap.get('MAC-10')!,
        collectionId: collMap.get('Recoil Collection')!,
      },

      // ── Dreams & Nightmares Collection ──
      {
        id: uuidv4(),
        name: 'AK-47 | Nightwish',
        price: 650.0,
        skinFloat: 0.02345678,
        weaponId: weaponMap.get('AK-47')!,
        collectionId: collMap.get('Dreams & Nightmares Collection')!,
      },
      {
        id: uuidv4(),
        name: 'MP9 | Starlight Protector',
        price: 42.0,
        skinFloat: 0.09876543,
        weaponId: weaponMap.get('MP9')!,
        collectionId: collMap.get('Dreams & Nightmares Collection')!,
      },
      {
        id: uuidv4(),
        name: 'FAMAS | Rapid Eye Movement',
        price: 28.0,
        skinFloat: 0.1456789,
        weaponId: weaponMap.get('FAMAS')!,
        collectionId: collMap.get('Dreams & Nightmares Collection')!,
      },
      {
        id: uuidv4(),
        name: 'P90 | Cocoa Rampage',
        price: 2.1,
        skinFloat: 0.38901234,
        weaponId: weaponMap.get('P90')!,
        collectionId: collMap.get('Dreams & Nightmares Collection')!,
      },

      // ── Fracture Collection ──
      {
        id: uuidv4(),
        name: 'Desert Eagle | Printstream',
        price: 145.0,
        skinFloat: 0.0156789,
        weaponId: weaponMap.get('Desert Eagle')!,
        collectionId: collMap.get('Fracture Collection')!,
      },
      {
        id: uuidv4(),
        name: 'Galil AR | Connexion',
        price: 6.5,
        skinFloat: 0.19012345,
        weaponId: weaponMap.get('Galil AR')!,
        collectionId: collMap.get('Fracture Collection')!,
      },
      {
        id: uuidv4(),
        name: 'P250 | Cyber Shell',
        price: 22.0,
        skinFloat: 0.11234567,
        weaponId: weaponMap.get('P250')!,
        collectionId: collMap.get('Fracture Collection')!,
      },
      {
        id: uuidv4(),
        name: 'XM1014 | Incinegator',
        price: 3.4,
        skinFloat: 0.28901234,
        weaponId: weaponMap.get('XM1014')!,
        collectionId: collMap.get('Fracture Collection')!,
      },

      // ── Clutch Collection ──
      {
        id: uuidv4(),
        name: 'M4A4 | Neo-Noir',
        price: 72.0,
        skinFloat: 0.06789012,
        weaponId: weaponMap.get('M4A4')!,
        collectionId: collMap.get('Clutch Collection')!,
      },
      {
        id: uuidv4(),
        name: 'AWP | Mortis',
        price: 28.0,
        skinFloat: 0.18765432,
        weaponId: weaponMap.get('AWP')!,
        collectionId: collMap.get('Clutch Collection')!,
      },
      {
        id: uuidv4(),
        name: 'UMP-45 | Arctic Wolf',
        price: 5.2,
        skinFloat: 0.15678901,
        weaponId: weaponMap.get('UMP-45')!,
        collectionId: collMap.get('Clutch Collection')!,
      },
      {
        id: uuidv4(),
        name: 'Nova | Wild Six',
        price: 0.5,
        skinFloat: 0.52345678,
        weaponId: weaponMap.get('Nova')!,
        collectionId: collMap.get('Clutch Collection')!,
      },

      // ── Spectrum Collection ──
      {
        id: uuidv4(),
        name: 'AK-47 | Bloodsport',
        price: 88.0,
        skinFloat: 0.03890123,
        weaponId: weaponMap.get('AK-47')!,
        collectionId: collMap.get('Spectrum Collection')!,
      },
      {
        id: uuidv4(),
        name: 'USP-S | Neo-Noir',
        price: 15.0,
        skinFloat: 0.07890123,
        weaponId: weaponMap.get('USP-S')!,
        collectionId: collMap.get('Spectrum Collection')!,
      },
      {
        id: uuidv4(),
        name: 'AWP | Fever Dream',
        price: 12.0,
        skinFloat: 0.21234567,
        weaponId: weaponMap.get('AWP')!,
        collectionId: collMap.get('Spectrum Collection')!,
      },
      {
        id: uuidv4(),
        name: 'Glock-18 | Off World',
        price: 4.8,
        skinFloat: 0.25678901,
        weaponId: weaponMap.get('Glock-18')!,
        collectionId: collMap.get('Spectrum Collection')!,
      },

      // ── Gamma Collection ──
      {
        id: uuidv4(),
        name: 'M4A1-S | Mecha Industries',
        price: 62.0,
        skinFloat: 0.02890123,
        weaponId: weaponMap.get('M4A1-S')!,
        collectionId: collMap.get('Gamma Collection')!,
      },
      {
        id: uuidv4(),
        name: 'SSG 08 | Dragonfire',
        price: 38.0,
        skinFloat: 0.04123456,
        weaponId: weaponMap.get('SSG 08')!,
        collectionId: collMap.get('Gamma Collection')!,
      },
      {
        id: uuidv4(),
        name: 'AUG | Aristocrat',
        price: 7.5,
        skinFloat: 0.13456789,
        weaponId: weaponMap.get('AUG')!,
        collectionId: collMap.get('Gamma Collection')!,
      },
      {
        id: uuidv4(),
        name: 'Negev | Power Loader',
        price: 0.35,
        skinFloat: 0.61234567,
        weaponId: weaponMap.get('Negev')!,
        collectionId: collMap.get('Gamma Collection')!,
      },
    ];

    await skinRepo.save(skins);
    console.log(`  ✅ ${this.name}: ${skins.length} skins insertadas.`);
  }
}
