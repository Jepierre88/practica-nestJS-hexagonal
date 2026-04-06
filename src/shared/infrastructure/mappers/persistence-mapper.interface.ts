/**
 * Clase base abstracta para mappers de persistencia.
 * @template Domain  - Modelo de dominio
 * @template OrmEntity - Entidad ORM (TypeORM, Prisma, etc.)
 */
export abstract class PersistenceMapper<Domain, OrmEntity> {
  abstract toDomain(orm: OrmEntity): Domain;
  abstract toOrm(domain: Domain): OrmEntity;
}
