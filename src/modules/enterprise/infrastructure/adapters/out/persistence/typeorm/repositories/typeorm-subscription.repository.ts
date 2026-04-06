import { SubscriptionRepositoryPort } from '@enterprise/application/ports/out/subscription-repository.port';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionOrmEntity } from '../entities/subscription.entity';
import { Repository } from 'typeorm';
import { Subscription } from '@enterprise/domain/model/subscription.model';
import { SubscriptionPersistenceMapper } from '../mappers/subcription-persistence.mapper';
import { ESubscriptionType } from '@enterprise/domain/enums/subscription-type.enum';

@Injectable()
export class TypeOrmSubscriptionRepository implements SubscriptionRepositoryPort {
  constructor(
    @InjectRepository(SubscriptionOrmEntity)
    private readonly subscriptionRepository: Repository<SubscriptionOrmEntity>,
    private readonly mapper: SubscriptionPersistenceMapper,
  ) {}

  async create(entity: Subscription): Promise<Subscription> {
    const ormEntity = this.mapper.toOrm(entity);
    const savedEntity = await this.subscriptionRepository.save(ormEntity);
    return this.mapper.toDomain(savedEntity);
  }

  async findById(id: string): Promise<Subscription | null> {
    const ormEntity = await this.subscriptionRepository.findOne({
      where: { id },
    });
    return ormEntity ? this.mapper.toDomain(ormEntity) : null;
  }

  async findAll(): Promise<Subscription[]> {
    const ormEntities = await this.subscriptionRepository.find();
    return ormEntities.map((e) => this.mapper.toDomain(e));
  }
  async update(id: string, entity: Subscription): Promise<Subscription> {
    const ormEntity = this.mapper.toOrm(entity);
    const updatedEntity = await this.subscriptionRepository.save({
      ...ormEntity,
      id,
    });
    return this.mapper.toDomain(updatedEntity);
  }

  async delete(id: string): Promise<void> {
    await this.subscriptionRepository.delete(id);
  }

  async existsById(id: string): Promise<boolean> {
    return this.subscriptionRepository.existsBy({ id });
  }

  async findOneByType(type: ESubscriptionType): Promise<Subscription | null> {
    const ormEntity = await this.subscriptionRepository.findOne({
      where: { subscriptionType: type },
    });
    return ormEntity ? this.mapper.toDomain(ormEntity) : null;
  }
}
