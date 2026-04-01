#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((r) => rl.question(q, r));

// ─── Helpers ──────────────────────────────────────────────

function toKebab(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function toPascal(str) {
  return str
    .split(/[-_\s]+/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function toCamel(str) {
  const pascal = toPascal(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function pluralize(str) {
  if (str.endsWith('s')) return str;
  if (str.endsWith('y') && !/[aeiou]y$/i.test(str)) return str.slice(0, -1) + 'ies';
  return str + 's';
}

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✓ ${path.relative(process.cwd(), filePath)}`);
}

// ─── Templates ──────────────────────────────────────────────

function domainModel(pascal, kebab) {
  return `export interface ${pascal}Props {
  readonly id?: string;
  readonly name: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface Create${pascal}Props {
  readonly name: string;
}

export interface Reconstruct${pascal}Props extends ${pascal}Props {}

export class ${pascal} {
  private readonly props: ${pascal}Props;

  private constructor(props: ${pascal}Props) {
    this.props = props;
  }

  static create(props: Create${pascal}Props): ${pascal} {
    return new ${pascal}(props);
  }

  static reconstruct(props: Reconstruct${pascal}Props): ${pascal} {
    return new ${pascal}(props);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  toPrimitives() {
    return {
      id: this.props.id,
      name: this.props.name,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
`;
}

function domainException(pascal, kebab) {
  return `import { DomainError } from '@shared/exceptions/domain-error.exception';

export class ${pascal}NotFoundException extends DomainError {
  constructor(identifier: string) {
    super(\`${pascal} "\${identifier}" not found.\`);
  }
}

export class ${pascal}AlreadyExistsException extends DomainError {
  constructor(identifier: string) {
    super(\`${pascal} "\${identifier}" already exists.\`);
  }
}
`;
}

function repositoryPort(pascal, kebab, crud) {
  if (crud) {
    return `import { ${pascal} } from '@${kebab}/domain/models/${kebab}.model';

export abstract class ${pascal}RepositoryPort {
  abstract create(entity: ${pascal}): Promise<${pascal}>;
  abstract findById(id: string): Promise<${pascal} | null>;
  abstract findAll(): Promise<${pascal}[]>;
  abstract update(id: string, entity: ${pascal}): Promise<${pascal}>;
  abstract delete(id: string): Promise<void>;
}
`;
  }
  return `import { ${pascal} } from '@${kebab}/domain/models/${kebab}.model';

export abstract class ${pascal}RepositoryPort {
  abstract create(entity: ${pascal}): Promise<${pascal}>;
  abstract findById(id: string): Promise<${pascal} | null>;
}
`;
}

// ─── Commands ───────────────────────────────────────────────

function createCommand(pascal, kebab) {
  return `export interface Create${pascal}CommandProps {
  readonly name: string;
}

export class Create${pascal}Command {
  private constructor(
    public readonly name: string,
  ) {}

  static create(props: Create${pascal}CommandProps): Create${pascal}Command {
    return new Create${pascal}Command(props.name);
  }
}
`;
}

function updateCommand(pascal, kebab) {
  return `export interface Update${pascal}CommandProps {
  readonly id: string;
  readonly name?: string;
}

export class Update${pascal}Command {
  private constructor(
    public readonly id: string,
    public readonly name?: string,
  ) {}

  static create(props: Update${pascal}CommandProps): Update${pascal}Command {
    return new Update${pascal}Command(props.id, props.name);
  }
}
`;
}

// ─── Ports (in) ─────────────────────────────────────────────

function createPort(pascal, kebab) {
  return `import { UseCasePort } from '@shared/domain/ports/use-case.port';
import { Create${pascal}Command } from '@${kebab}/application/commands/create-${kebab}.command';
import { ${pascal} } from '@${kebab}/domain/models/${kebab}.model';

export abstract class Create${pascal}UseCase implements UseCasePort<Create${pascal}Command, ${pascal}> {
  abstract execute(input: Create${pascal}Command): Promise<${pascal}>;
}
`;
}

function findPort(pascal, kebab) {
  return `import { ${pascal} } from '@${kebab}/domain/models/${kebab}.model';

export abstract class Find${pascal}sUseCase {
  abstract findAll(): Promise<${pascal}[]>;
  abstract findById(id: string): Promise<${pascal}>;
}
`;
}

function updatePort(pascal, kebab) {
  return `import { UseCasePort } from '@shared/domain/ports/use-case.port';
import { Update${pascal}Command } from '@${kebab}/application/commands/update-${kebab}.command';
import { ${pascal} } from '@${kebab}/domain/models/${kebab}.model';

export abstract class Update${pascal}UseCase implements UseCasePort<Update${pascal}Command, ${pascal}> {
  abstract execute(input: Update${pascal}Command): Promise<${pascal}>;
}
`;
}

function deletePort(pascal, kebab) {
  return `export abstract class Delete${pascal}UseCase {
  abstract execute(id: string): Promise<void>;
}
`;
}

// ─── Use Cases ──────────────────────────────────────────────

function createService(pascal, kebab, camel) {
  return `import { Injectable } from '@nestjs/common';
import { Create${pascal}UseCase } from '../ports/in/create-${kebab}.port';
import { Create${pascal}Command } from '../commands/create-${kebab}.command';
import { ${pascal} } from '../../domain/models/${kebab}.model';
import { ${pascal}RepositoryPort } from '../ports/out/${kebab}-repository.port';

@Injectable()
export class Create${pascal}Service implements Create${pascal}UseCase {
  constructor(private readonly ${camel}Repository: ${pascal}RepositoryPort) {}

  async execute(command: Create${pascal}Command): Promise<${pascal}> {
    const entity = ${pascal}.create({ name: command.name });
    return this.${camel}Repository.create(entity);
  }
}
`;
}

function findService(pascal, kebab, camel) {
  return `import { Injectable } from '@nestjs/common';
import { Find${pascal}sUseCase } from '../ports/in/find-${kebab}s.port';
import { ${pascal} } from '../../domain/models/${kebab}.model';
import { ${pascal}RepositoryPort } from '../ports/out/${kebab}-repository.port';
import { ${pascal}NotFoundException } from '../../domain/exceptions/${kebab}.exception';

@Injectable()
export class Find${pascal}sService implements Find${pascal}sUseCase {
  constructor(private readonly ${camel}Repository: ${pascal}RepositoryPort) {}

  async findAll(): Promise<${pascal}[]> {
    return this.${camel}Repository.findAll();
  }

  async findById(id: string): Promise<${pascal}> {
    const entity = await this.${camel}Repository.findById(id);
    if (!entity) {
      throw new ${pascal}NotFoundException(id);
    }
    return entity;
  }
}
`;
}

function updateService(pascal, kebab, camel) {
  return `import { Injectable } from '@nestjs/common';
import { Update${pascal}UseCase } from '../ports/in/update-${kebab}.port';
import { Update${pascal}Command } from '../commands/update-${kebab}.command';
import { ${pascal} } from '../../domain/models/${kebab}.model';
import { ${pascal}RepositoryPort } from '../ports/out/${kebab}-repository.port';
import { ${pascal}NotFoundException } from '../../domain/exceptions/${kebab}.exception';

@Injectable()
export class Update${pascal}Service implements Update${pascal}UseCase {
  constructor(private readonly ${camel}Repository: ${pascal}RepositoryPort) {}

  async execute(command: Update${pascal}Command): Promise<${pascal}> {
    const existing = await this.${camel}Repository.findById(command.id);
    if (!existing) {
      throw new ${pascal}NotFoundException(command.id);
    }
    // TODO: apply changes to domain model
    return this.${camel}Repository.update(command.id, existing);
  }
}
`;
}

function deleteService(pascal, kebab, camel) {
  return `import { Injectable } from '@nestjs/common';
import { Delete${pascal}UseCase } from '../ports/in/delete-${kebab}.port';
import { ${pascal}RepositoryPort } from '../ports/out/${kebab}-repository.port';
import { ${pascal}NotFoundException } from '../../domain/exceptions/${kebab}.exception';

@Injectable()
export class Delete${pascal}Service implements Delete${pascal}UseCase {
  constructor(private readonly ${camel}Repository: ${pascal}RepositoryPort) {}

  async execute(id: string): Promise<void> {
    const existing = await this.${camel}Repository.findById(id);
    if (!existing) {
      throw new ${pascal}NotFoundException(id);
    }
    await this.${camel}Repository.delete(id);
  }
}
`;
}

// ─── Infrastructure ─────────────────────────────────────────

function ormEntity(pascal, kebab, pluralKebab, schema) {
  return `import { DbSchemas } from '@shared/schemas';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('${pluralKebab}', { schema: DbSchemas.${schema} })
export class ${pascal}OrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}
`;
}

function persistenceMapper(pascal, kebab) {
  return `import { ${pascal} } from '@${kebab}/domain/models/${kebab}.model';
import { ${pascal}OrmEntity } from '../entities/${kebab}-orm.entity';

export class ${pascal}PersistenceMapper {
  static toOrm(domain: ${pascal}): ${pascal}OrmEntity {
    const primitives = domain.toPrimitives();
    const orm = new ${pascal}OrmEntity();
    if (primitives.id) orm.id = primitives.id;
    orm.name = primitives.name;
    return orm;
  }

  static toDomain(orm: ${pascal}OrmEntity): ${pascal} {
    return ${pascal}.reconstruct({
      id: orm.id,
      name: orm.name,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }
}
`;
}

function typeormRepository(pascal, kebab, camel, crud) {
  const methods = crud
    ? `
  async create(entity: ${pascal}): Promise<${pascal}> {
    const orm = ${pascal}PersistenceMapper.toOrm(entity);
    const saved = await this.repository.save(orm);
    return ${pascal}PersistenceMapper.toDomain(saved);
  }

  async findById(id: string): Promise<${pascal} | null> {
    const orm = await this.repository.findOne({ where: { id } });
    return orm ? ${pascal}PersistenceMapper.toDomain(orm) : null;
  }

  async findAll(): Promise<${pascal}[]> {
    const entities = await this.repository.findBy({});
    return entities.map(${pascal}PersistenceMapper.toDomain);
  }

  async update(id: string, entity: ${pascal}): Promise<${pascal}> {
    const orm = ${pascal}PersistenceMapper.toOrm(entity);
    orm.id = id;
    const saved = await this.repository.save(orm);
    return ${pascal}PersistenceMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }`
    : `
  async create(entity: ${pascal}): Promise<${pascal}> {
    const orm = ${pascal}PersistenceMapper.toOrm(entity);
    const saved = await this.repository.save(orm);
    return ${pascal}PersistenceMapper.toDomain(saved);
  }

  async findById(id: string): Promise<${pascal} | null> {
    const orm = await this.repository.findOne({ where: { id } });
    return orm ? ${pascal}PersistenceMapper.toDomain(orm) : null;
  }`;

  return `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${pascal}RepositoryPort } from '@${kebab}/application/ports/out/${kebab}-repository.port';
import { ${pascal} } from '@${kebab}/domain/models/${kebab}.model';
import { ${pascal}OrmEntity } from '../entities/${kebab}-orm.entity';
import { ${pascal}PersistenceMapper } from '../mappers/${kebab}-persistence.mapper';

@Injectable()
export class TypeOrm${pascal}Repository implements ${pascal}RepositoryPort {
  constructor(
    @InjectRepository(${pascal}OrmEntity)
    private readonly repository: Repository<${pascal}OrmEntity>,
  ) {}
${methods}
}
`;
}

// ─── DTOs ───────────────────────────────────────────────────

function createDto(pascal, kebab) {
  return `import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class Create${pascal}Dto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  readonly name: string;
}
`;
}

function updateDto(pascal, kebab) {
  return `import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class Update${pascal}Dto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  readonly name?: string;
}
`;
}

function responseDto(pascal, kebab) {
  return `export class ${pascal}ResponseDto {
  readonly id: string;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: ${pascal}ResponseDto) {
    this.id = props.id;
    this.name = props.name;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
`;
}

function uuidParamDto() {
  return `import { IsUUID } from 'class-validator';

export class UuidParam {
  @IsUUID()
  readonly id: string;
}
`;
}

function dtosIndex(pascal, crud) {
  let exp = `export { Create${pascal}Dto } from './create-${toKebab(pascal)}.dto';\n`;
  exp += `export { ${pascal}ResponseDto } from './${toKebab(pascal)}-response.dto';\n`;
  exp += `export { UuidParam } from './uuid-param.dto';\n`;
  if (crud) {
    exp += `export { Update${pascal}Dto } from './update-${toKebab(pascal)}.dto';\n`;
  }
  return exp;
}

// ─── Mapper & Filter ────────────────────────────────────────

function dtoMapper(pascal, kebab) {
  return `import { ${pascal} } from '@${kebab}/domain/models/${kebab}.model';
import { ${pascal}ResponseDto } from '../dtos/${kebab}-response.dto';

export class ${pascal}DtoMapper {
  static toResponse(entity: ${pascal}): ${pascal}ResponseDto {
    const primitives = entity.toPrimitives();
    return new ${pascal}ResponseDto({
      id: primitives.id!,
      name: primitives.name,
      createdAt: primitives.createdAt!,
      updatedAt: primitives.updatedAt!,
    });
  }

  static toResponseList(entities: ${pascal}[]): ${pascal}ResponseDto[] {
    return entities.map(${pascal}DtoMapper.toResponse);
  }
}
`;
}

function exceptionFilter(pascal, kebab) {
  return `import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from '@shared/exceptions/domain-error.exception';
import { ${pascal}NotFoundException } from '@${kebab}/domain/exceptions/${kebab}.exception';

@Catch(DomainError)
export class ${pascal}DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = this.mapToHttpStatus(exception);

    response.status(status).json({
      statusCode: status,
      error: exception.name,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }

  private mapToHttpStatus(exception: DomainError): number {
    if (exception instanceof ${pascal}NotFoundException) return HttpStatus.NOT_FOUND;
    return HttpStatus.BAD_REQUEST;
  }
}
`;
}

// ─── Controller ─────────────────────────────────────────────

function controller(pascal, kebab, camel, pluralKebab, crud) {
  const imports = [
    `import { Controller, Post, Body, HttpCode, HttpStatus, UseFilters } from '@nestjs/common';`,
  ];
  const injects = [`private readonly create${pascal}UseCase: Create${pascal}UseCase,`];
  const importPorts = [`import { Create${pascal}UseCase } from '@${kebab}/application/ports/in/create-${kebab}.port';`];
  const importDtos = [`import { Create${pascal}Dto } from './dtos/create-${kebab}.dto';`];
  const importCommands = [`import { Create${pascal}Command } from '@${kebab}/application/commands/create-${kebab}.command';`];

  let methods = `
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: Create${pascal}Dto): Promise<${pascal}ResponseDto> {
    const entity = await this.create${pascal}UseCase.execute(Create${pascal}Command.create({ ...dto }));
    return ${pascal}DtoMapper.toResponse(entity);
  }`;

  if (crud) {
    imports[0] = `import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, UseFilters } from '@nestjs/common';`;
    injects.push(
      `private readonly find${pascal}sUseCase: Find${pascal}sUseCase,`,
      `private readonly update${pascal}UseCase: Update${pascal}UseCase,`,
      `private readonly delete${pascal}UseCase: Delete${pascal}UseCase,`,
    );
    importPorts.push(
      `import { Find${pascal}sUseCase } from '@${kebab}/application/ports/in/find-${kebab}s.port';`,
      `import { Update${pascal}UseCase } from '@${kebab}/application/ports/in/update-${kebab}.port';`,
      `import { Delete${pascal}UseCase } from '@${kebab}/application/ports/in/delete-${kebab}.port';`,
    );
    importDtos.push(
      `import { Update${pascal}Dto } from './dtos/update-${kebab}.dto';`,
    );
    importCommands.push(
      `import { Update${pascal}Command } from '@${kebab}/application/commands/update-${kebab}.command';`,
    );
    methods += `

  @Get()
  async findAll(): Promise<${pascal}ResponseDto[]> {
    const entities = await this.find${pascal}sUseCase.findAll();
    return ${pascal}DtoMapper.toResponseList(entities);
  }

  @Get(':id')
  async findById(@Param() params: UuidParam): Promise<${pascal}ResponseDto> {
    const entity = await this.find${pascal}sUseCase.findById(params.id);
    return ${pascal}DtoMapper.toResponse(entity);
  }

  @Put(':id')
  async update(@Param() params: UuidParam, @Body() dto: Update${pascal}Dto): Promise<${pascal}ResponseDto> {
    const entity = await this.update${pascal}UseCase.execute(Update${pascal}Command.create({ id: params.id, ...dto }));
    return ${pascal}DtoMapper.toResponse(entity);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params: UuidParam): Promise<void> {
    await this.delete${pascal}UseCase.execute(params.id);
  }`;
  }

  return `${imports.join('\n')}
${importPorts.join('\n')}
${importDtos.join('\n')}
${importCommands.join('\n')}
import { ${pascal}ResponseDto } from './dtos/${kebab}-response.dto';
import { UuidParam } from './dtos/uuid-param.dto';
import { ${pascal}DtoMapper } from './mappers/${kebab}-dto.mapper';
import { ${pascal}DomainExceptionFilter } from './filters/${kebab}-domain-exception.filter';

@Controller('${pluralKebab}')
@UseFilters(${pascal}DomainExceptionFilter)
export class ${pascal}Controller {
  constructor(
    ${injects.join('\n    ')}
  ) {}
${methods}
}
`;
}

// ─── Module ─────────────────────────────────────────────────

function nestModule(pascal, kebab, crud) {
  const providers = [
    `{ provide: Create${pascal}UseCase, useClass: Create${pascal}Service },`,
    `{ provide: ${pascal}RepositoryPort, useClass: TypeOrm${pascal}Repository },`,
  ];
  const imports = [
    `import { Create${pascal}UseCase } from '../application/ports/in/create-${kebab}.port';`,
    `import { Create${pascal}Service } from '../application/usecases/create-${kebab}.service';`,
  ];

  if (crud) {
    providers.push(
      `{ provide: Find${pascal}sUseCase, useClass: Find${pascal}sService },`,
      `{ provide: Update${pascal}UseCase, useClass: Update${pascal}Service },`,
      `{ provide: Delete${pascal}UseCase, useClass: Delete${pascal}Service },`,
    );
    imports.push(
      `import { Find${pascal}sUseCase } from '../application/ports/in/find-${kebab}s.port';`,
      `import { Find${pascal}sService } from '../application/usecases/find-${kebab}s.service';`,
      `import { Update${pascal}UseCase } from '../application/ports/in/update-${kebab}.port';`,
      `import { Update${pascal}Service } from '../application/usecases/update-${kebab}.service';`,
      `import { Delete${pascal}UseCase } from '../application/ports/in/delete-${kebab}.port';`,
      `import { Delete${pascal}Service } from '../application/usecases/delete-${kebab}.service';`,
    );
  }

  return `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
${imports.join('\n')}
import { ${pascal}RepositoryPort } from '../application/ports/out/${kebab}-repository.port';
import { TypeOrm${pascal}Repository } from './adapters/out/persistence/typeorm/repositories/typeorm-${kebab}.repository';
import { ${pascal}OrmEntity } from './adapters/out/persistence/typeorm/entities/${kebab}-orm.entity';
import { ${pascal}Controller } from './adapters/in/rest/${kebab}.controller';

@Module({
  imports: [TypeOrmModule.forFeature([${pascal}OrmEntity])],
  controllers: [${pascal}Controller],
  providers: [
    ${providers.join('\n    ')}
  ],
})
export class ${pascal}Module {}
`;
}

// ─── Main ───────────────────────────────────────────────────

async function main() {
  console.log('\n🧱 Hexagonal Module Generator\n');

  const rawName = await ask('📦 Module name (e.g. "product", "blog-post"): ');
  const kebab = toKebab(rawName.trim());
  const pascal = toPascal(kebab);
  const camel = toCamel(kebab);

  const defaultPlural = pluralize(kebab);
  const pluralAnswer = await ask(`📚 Plural name for routes/tables [${defaultPlural}]: `);
  const pluralKebab = pluralAnswer.trim() ? toKebab(pluralAnswer.trim()) : defaultPlural;
  const pluralPascal = toPascal(pluralKebab);

  const schemaName = await ask(`🗄️  DB schema name in DbSchemas enum (e.g. Task, Auth, Tech): `);

  const crudAnswer = await ask('📝 Generate full CRUD? (y/n) [y]: ');
  const crud = crudAnswer.trim().toLowerCase() !== 'n';

  rl.close();

  const base = path.join(process.cwd(), 'src', 'modules', kebab);

  console.log(`\n📁 Generating module "${pascal}" at src/modules/${kebab}/\n`);
  console.log(`   Plural: ${pluralKebab}`);
  console.log(`   CRUD: ${crud ? 'Yes (create, find, update, delete)' : 'No (create only)'}`);
  console.log(`   Schema: ${schemaName}\n`);

  // Domain
  writeFile(path.join(base, 'domain', 'models', `${kebab}.model.ts`), domainModel(pascal, kebab));
  writeFile(path.join(base, 'domain', 'exceptions', `${kebab}.exception.ts`), domainException(pascal, kebab));

  // Application — Commands
  writeFile(path.join(base, 'application', 'commands', `create-${kebab}.command.ts`), createCommand(pascal, kebab));
  if (crud) {
    writeFile(path.join(base, 'application', 'commands', `update-${kebab}.command.ts`), updateCommand(pascal, kebab));
  }

  // Application — Ports in
  writeFile(path.join(base, 'application', 'ports', 'in', `create-${kebab}.port.ts`), createPort(pascal, kebab));
  if (crud) {
    writeFile(path.join(base, 'application', 'ports', 'in', `find-${kebab}s.port.ts`), findPort(pascal, kebab));
    writeFile(path.join(base, 'application', 'ports', 'in', `update-${kebab}.port.ts`), updatePort(pascal, kebab));
    writeFile(path.join(base, 'application', 'ports', 'in', `delete-${kebab}.port.ts`), deletePort(pascal, kebab));
  }

  // Application — Ports out
  writeFile(path.join(base, 'application', 'ports', 'out', `${kebab}-repository.port.ts`), repositoryPort(pascal, kebab, crud));

  // Application — Use Cases
  writeFile(path.join(base, 'application', 'usecases', `create-${kebab}.service.ts`), createService(pascal, kebab, camel));
  if (crud) {
    writeFile(path.join(base, 'application', 'usecases', `find-${kebab}s.service.ts`), findService(pascal, kebab, camel));
    writeFile(path.join(base, 'application', 'usecases', `update-${kebab}.service.ts`), updateService(pascal, kebab, camel));
    writeFile(path.join(base, 'application', 'usecases', `delete-${kebab}.service.ts`), deleteService(pascal, kebab, camel));
  }

  // Infrastructure — Persistence
  writeFile(path.join(base, 'infrastructure', 'adapters', 'out', 'persistence', 'typeorm', 'entities', `${kebab}-orm.entity.ts`), ormEntity(pascal, kebab, pluralKebab, schemaName));
  writeFile(path.join(base, 'infrastructure', 'adapters', 'out', 'persistence', 'typeorm', 'mappers', `${kebab}-persistence.mapper.ts`), persistenceMapper(pascal, kebab));
  writeFile(path.join(base, 'infrastructure', 'adapters', 'out', 'persistence', 'typeorm', 'repositories', `typeorm-${kebab}.repository.ts`), typeormRepository(pascal, kebab, camel, crud));

  // Infrastructure — REST
  writeFile(path.join(base, 'infrastructure', 'adapters', 'in', 'rest', 'dtos', `create-${kebab}.dto.ts`), createDto(pascal, kebab));
  writeFile(path.join(base, 'infrastructure', 'adapters', 'in', 'rest', 'dtos', `${kebab}-response.dto.ts`), responseDto(pascal, kebab));
  writeFile(path.join(base, 'infrastructure', 'adapters', 'in', 'rest', 'dtos', 'uuid-param.dto.ts'), uuidParamDto());
  if (crud) {
    writeFile(path.join(base, 'infrastructure', 'adapters', 'in', 'rest', 'dtos', `update-${kebab}.dto.ts`), updateDto(pascal, kebab));
  }
  writeFile(path.join(base, 'infrastructure', 'adapters', 'in', 'rest', 'mappers', `${kebab}-dto.mapper.ts`), dtoMapper(pascal, kebab));
  writeFile(path.join(base, 'infrastructure', 'adapters', 'in', 'rest', 'filters', `${kebab}-domain-exception.filter.ts`), exceptionFilter(pascal, kebab));
  writeFile(path.join(base, 'infrastructure', 'adapters', 'in', 'rest', `${kebab}.controller.ts`), controller(pascal, kebab, camel, pluralKebab, crud));

  // Infrastructure — Module
  writeFile(path.join(base, 'infrastructure', `${kebab}.module.ts`), nestModule(pascal, kebab, crud));

  console.log(`\n✅ Module "${pascal}" generated successfully!`);
  console.log(`\n⚠️  Next steps:`);
  console.log(`   1. Add "${pascal}" to DbSchemas enum in src/shared/schemas.ts (if not already there)`);
  console.log(`   2. Add path alias "@${kebab}/*" in tsconfig.json`);
  console.log(`   3. Register ${pascal}Module in app.module.ts`);
  console.log(`   4. Add ${pascal}OrmEntity to the entities array in app.module.ts`);
  console.log(`   5. Generate a migration: npm run migration:generate --name=Create${pascal}Table`);
  console.log(`   6. Run migration: npm run migration:run\n`);
}

main().catch(console.error);
