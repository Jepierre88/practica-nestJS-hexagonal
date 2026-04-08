#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
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
  if (str.endsWith('y') && !/[aeiou]y$/i.test(str))
    return str.slice(0, -1) + 'ies';
  return str + 's';
}

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`  ✓ ${path.relative(process.cwd(), filePath)}`);
}

// ─── Templates ──────────────────────────────────────────────

function domainModel(pascal, alias) {
  return `import { DomainModel, DomainProps } from '@shared/domain/models/domain.model';

export interface ${pascal}Props {
  readonly id?: string;
  readonly name: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface Create${pascal}Props {
  readonly name: string;
}

export interface Reconstruct${pascal}Props extends ${pascal}Props {}

export interface ${pascal} extends DomainProps<${pascal}Props> {}
export class ${pascal} extends DomainModel<${pascal}Props> {
  private constructor(props: ${pascal}Props) {
    super(props);
  }

  static create(props: Create${pascal}Props): ${pascal} {
    return new ${pascal}(props);
  }

  static reconstruct(props: Reconstruct${pascal}Props): ${pascal} {
    return new ${pascal}(props);
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

function domainException(pascal) {
  return `import { DomainError } from '@shared/domain/exceptions/domain-error.exception';

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

function repositoryPort(pascal, alias, crud) {
  if (crud) {
    return `import { ${pascal} } from '${alias}/domain/models/${toKebab(pascal)}.model';

export abstract class ${pascal}RepositoryPort {
  abstract create(entity: ${pascal}): Promise<${pascal}>;
  abstract findById(id: string): Promise<${pascal} | null>;
  abstract findAll(): Promise<${pascal}[]>;
  abstract update(id: string, entity: ${pascal}): Promise<${pascal}>;
  abstract delete(id: string): Promise<void>;
}
`;
  }
  return `import { ${pascal} } from '${alias}/domain/models/${toKebab(pascal)}.model';

export abstract class ${pascal}RepositoryPort {
  abstract create(entity: ${pascal}): Promise<${pascal}>;
  abstract findById(id: string): Promise<${pascal} | null>;
}
`;
}

// ─── Commands ───────────────────────────────────────────────

function createCommand(pascal) {
  return `export interface Create${pascal}Command {
  readonly name: string;
}
`;
}

function updateCommand(pascal) {
  return `export interface Update${pascal}Command {
  readonly id: string;
  readonly name?: string;
}
`;
}

// ─── Ports (in) ─────────────────────────────────────────────

function createPort(pascal, alias, kebab) {
  return `import { UseCasePort } from '@shared/application/ports/in/use-case.port';
import { Create${pascal}Command } from '${alias}/application/commands/create-${kebab}.command';
import { ${pascal} } from '${alias}/domain/models/${kebab}.model';

export abstract class Create${pascal}UseCase implements UseCasePort<Create${pascal}Command, ${pascal}> {
  abstract execute(input: Create${pascal}Command): Promise<${pascal}>;
}
`;
}

function findPort(pascal, alias, kebab) {
  return `import { ${pascal} } from '${alias}/domain/models/${kebab}.model';

export abstract class Find${pascal}sUseCase {
  abstract findAll(): Promise<${pascal}[]>;
  abstract findById(id: string): Promise<${pascal}>;
}
`;
}

function updatePort(pascal, alias, kebab) {
  return `import { UseCasePort } from '@shared/application/ports/in/use-case.port';
import { Update${pascal}Command } from '${alias}/application/commands/update-${kebab}.command';
import { ${pascal} } from '${alias}/domain/models/${kebab}.model';

export abstract class Update${pascal}UseCase implements UseCasePort<Update${pascal}Command, ${pascal}> {
  abstract execute(input: Update${pascal}Command): Promise<${pascal}>;
}
`;
}

function deletePort(pascal) {
  return `export abstract class Delete${pascal}UseCase {
  abstract execute(id: string): Promise<void>;
}
`;
}

// ─── Use Cases ──────────────────────────────────────────────

function createService(pascal, alias, kebab, camel) {
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

function findService(pascal, alias, kebab, camel) {
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

function updateService(pascal, alias, kebab, camel) {
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
    return this.${camel}Repository.update(command.id, existing);
  }
}
`;
}

function deleteService(pascal, alias, kebab, camel) {
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

function persistenceMapper(pascal, alias, kebab) {
  return `import { ${pascal} } from '${alias}/domain/models/${kebab}.model';
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

function typeormRepository(pascal, alias, kebab, camel, crud) {
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
import { ${pascal}RepositoryPort } from '${alias}/application/ports/out/${kebab}-repository.port';
import { ${pascal} } from '${alias}/domain/models/${kebab}.model';
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

function updateDto(pascal) {
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

function responseDto(pascal) {
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

// ─── Mapper & Filter ────────────────────────────────────────

function dtoMapper(pascal, alias, kebab) {
  return `import { ${pascal} } from '${alias}/domain/models/${kebab}.model';
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

function exceptionFilter(pascal, alias, kebab) {
  return `import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from '@shared/domain/exceptions/domain-error.exception';
import { ${pascal}NotFoundException } from '${alias}/domain/exceptions/${kebab}.exception';

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

function controller(
  pascal,
  alias,
  kebab,
  camel,
  pluralKebab,
  crud,
  parentKebab,
) {
  const routePrefix = `${parentKebab}/${pluralKebab}`;
  const imports = [
    `import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';`,
  ];
  const injects = [
    `private readonly create${pascal}UseCase: Create${pascal}UseCase,`,
  ];
  const importPorts = [
    `import { Create${pascal}UseCase } from '${alias}/application/ports/in/create-${kebab}.port';`,
  ];
  const importDtos = [
    `import { Create${pascal}Dto } from './dtos/create-${kebab}.dto';`,
  ];

  let methods = `
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: Create${pascal}Dto): Promise<${pascal}ResponseDto> {
    const entity = await this.create${pascal}UseCase.execute({ ...dto });
    return ${pascal}DtoMapper.toResponse(entity);
  }`;

  if (crud) {
    imports[0] = `import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';`;
    injects.push(
      `private readonly find${pascal}sUseCase: Find${pascal}sUseCase,`,
      `private readonly update${pascal}UseCase: Update${pascal}UseCase,`,
      `private readonly delete${pascal}UseCase: Delete${pascal}UseCase,`,
    );
    importPorts.push(
      `import { Find${pascal}sUseCase } from '${alias}/application/ports/in/find-${kebab}s.port';`,
      `import { Update${pascal}UseCase } from '${alias}/application/ports/in/update-${kebab}.port';`,
      `import { Delete${pascal}UseCase } from '${alias}/application/ports/in/delete-${kebab}.port';`,
    );
    importDtos.push(
      `import { Update${pascal}Dto } from './dtos/update-${kebab}.dto';`,
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
    const entity = await this.update${pascal}UseCase.execute({ id: params.id, ...dto });
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
import { ${pascal}ResponseDto } from './dtos/${kebab}-response.dto';
import { UuidParam } from './dtos/uuid-param.dto';
import { ${pascal}DtoMapper } from './mappers/${kebab}-dto.mapper';

@Controller('${routePrefix}')
export class ${pascal}Controller {
  constructor(
    ${injects.join('\n    ')}
  ) {}
${methods}
}
`;
}

// ─── Sub-module NestJS Module ─────────────────────────────

function subModule(pascal, alias, kebab, crud) {
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
  exports: [${pascal}RepositoryPort],
})
export class ${pascal}Module {}
`;
}

// ─── Parent Module ──────────────────────────────────────────

function parentModule(parentPascal, subModules) {
  const moduleImports = subModules.map(
    (s) =>
      `import { ${s.pascal}Module } from './${s.kebab}/infrastructure/${s.kebab}.module';`,
  );
  const moduleNames = subModules.map((s) => `${s.pascal}Module`);

  return `import { Module } from '@nestjs/common';
${moduleImports.join('\n')}

@Module({
  imports: [${moduleNames.join(', ')}],
  exports: [${moduleNames.join(', ')}],
})
export class ${parentPascal}Module {}
`;
}

// ─── Generate single sub-module files ───────────────────────

function generateSubModule(
  base,
  parentKebab,
  kebab,
  pascal,
  camel,
  pluralKebab,
  schema,
  crud,
) {
  const alias = `@${parentKebab}/${kebab}`;
  const subBase = path.join(base, kebab);

  // Domain
  writeFile(
    path.join(subBase, 'domain', 'models', `${kebab}.model.ts`),
    domainModel(pascal, alias),
  );
  writeFile(
    path.join(subBase, 'domain', 'exceptions', `${kebab}.exception.ts`),
    domainException(pascal),
  );

  // Application — Commands
  writeFile(
    path.join(subBase, 'application', 'commands', `create-${kebab}.command.ts`),
    createCommand(pascal),
  );
  if (crud) {
    writeFile(
      path.join(
        subBase,
        'application',
        'commands',
        `update-${kebab}.command.ts`,
      ),
      updateCommand(pascal),
    );
  }

  // Application — Ports in
  writeFile(
    path.join(subBase, 'application', 'ports', 'in', `create-${kebab}.port.ts`),
    createPort(pascal, alias, kebab),
  );
  if (crud) {
    writeFile(
      path.join(
        subBase,
        'application',
        'ports',
        'in',
        `find-${kebab}s.port.ts`,
      ),
      findPort(pascal, alias, kebab),
    );
    writeFile(
      path.join(
        subBase,
        'application',
        'ports',
        'in',
        `update-${kebab}.port.ts`,
      ),
      updatePort(pascal, alias, kebab),
    );
    writeFile(
      path.join(
        subBase,
        'application',
        'ports',
        'in',
        `delete-${kebab}.port.ts`,
      ),
      deletePort(pascal),
    );
  }

  // Application — Ports out
  writeFile(
    path.join(
      subBase,
      'application',
      'ports',
      'out',
      `${kebab}-repository.port.ts`,
    ),
    repositoryPort(pascal, alias, crud),
  );

  // Application — Use Cases
  writeFile(
    path.join(subBase, 'application', 'usecases', `create-${kebab}.service.ts`),
    createService(pascal, alias, kebab, camel),
  );
  if (crud) {
    writeFile(
      path.join(
        subBase,
        'application',
        'usecases',
        `find-${kebab}s.service.ts`,
      ),
      findService(pascal, alias, kebab, camel),
    );
    writeFile(
      path.join(
        subBase,
        'application',
        'usecases',
        `update-${kebab}.service.ts`,
      ),
      updateService(pascal, alias, kebab, camel),
    );
    writeFile(
      path.join(
        subBase,
        'application',
        'usecases',
        `delete-${kebab}.service.ts`,
      ),
      deleteService(pascal, alias, kebab, camel),
    );
  }

  // Infrastructure — Persistence
  writeFile(
    path.join(
      subBase,
      'infrastructure',
      'adapters',
      'out',
      'persistence',
      'typeorm',
      'entities',
      `${kebab}-orm.entity.ts`,
    ),
    ormEntity(pascal, kebab, pluralKebab, schema),
  );
  writeFile(
    path.join(
      subBase,
      'infrastructure',
      'adapters',
      'out',
      'persistence',
      'typeorm',
      'mappers',
      `${kebab}-persistence.mapper.ts`,
    ),
    persistenceMapper(pascal, alias, kebab),
  );
  writeFile(
    path.join(
      subBase,
      'infrastructure',
      'adapters',
      'out',
      'persistence',
      'typeorm',
      'repositories',
      `typeorm-${kebab}.repository.ts`,
    ),
    typeormRepository(pascal, alias, kebab, camel, crud),
  );

  // Infrastructure — REST
  writeFile(
    path.join(
      subBase,
      'infrastructure',
      'adapters',
      'in',
      'rest',
      'dtos',
      `create-${kebab}.dto.ts`,
    ),
    createDto(pascal, kebab),
  );
  writeFile(
    path.join(
      subBase,
      'infrastructure',
      'adapters',
      'in',
      'rest',
      'dtos',
      `${kebab}-response.dto.ts`,
    ),
    responseDto(pascal),
  );
  writeFile(
    path.join(
      subBase,
      'infrastructure',
      'adapters',
      'in',
      'rest',
      'dtos',
      'uuid-param.dto.ts',
    ),
    uuidParamDto(),
  );
  if (crud) {
    writeFile(
      path.join(
        subBase,
        'infrastructure',
        'adapters',
        'in',
        'rest',
        'dtos',
        `update-${kebab}.dto.ts`,
      ),
      updateDto(pascal),
    );
  }
  writeFile(
    path.join(
      subBase,
      'infrastructure',
      'adapters',
      'in',
      'rest',
      'mappers',
      `${kebab}-dto.mapper.ts`,
    ),
    dtoMapper(pascal, alias, kebab),
  );
  writeFile(
    path.join(
      subBase,
      'infrastructure',
      'adapters',
      'in',
      'rest',
      `${kebab}.controller.ts`,
    ),
    controller(pascal, alias, kebab, camel, pluralKebab, crud, parentKebab),
  );

  // Infrastructure — Module
  writeFile(
    path.join(subBase, 'infrastructure', `${kebab}.module.ts`),
    subModule(pascal, alias, kebab, crud),
  );
}

// ─── Main ───────────────────────────────────────────────────

async function main() {
  console.log('\n🧱 Hexagonal Sub-Module Generator\n');

  const rawParent = await ask('📦 Parent module name (e.g. "cs2"): ');
  const parentKebab = toKebab(rawParent.trim());
  const parentPascal = toPascal(parentKebab);

  const rawSubModules = await ask(
    '📂 Sub-modules (comma-separated, e.g. "weapon, skin, case"): ',
  );
  const subModuleNames = rawSubModules
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (subModuleNames.length === 0) {
    console.log('❌ No sub-modules provided. Exiting.');
    rl.close();
    return;
  }

  const schemaName = await ask(
    `🗄️  DB schema name in DbSchemas enum (e.g. Cs2, Game): `,
  );

  const crudAnswer = await ask(
    '📝 Generate full CRUD for all sub-modules? (y/n) [y]: ',
  );
  const crud = crudAnswer.trim().toLowerCase() !== 'n';

  rl.close();

  const base = path.join(process.cwd(), 'src', 'modules', parentKebab);
  const subModules = [];

  for (const rawName of subModuleNames) {
    const kebab = toKebab(rawName);
    const pascal = toPascal(kebab);
    const camel = toCamel(kebab);
    const defaultPlural = pluralize(kebab);

    subModules.push({ kebab, pascal, camel, pluralKebab: defaultPlural });

    console.log(
      `\n📁 Generating sub-module "${pascal}" at src/modules/${parentKebab}/${kebab}/\n`,
    );
    generateSubModule(
      base,
      parentKebab,
      kebab,
      pascal,
      camel,
      defaultPlural,
      schemaName,
      crud,
    );
  }

  // Parent module
  console.log(`\n📁 Generating parent module "${parentPascal}Module"\n`);
  writeFile(
    path.join(base, `${parentKebab}.module.ts`),
    parentModule(parentPascal, subModules),
  );

  // Summary
  console.log(
    `\n✅ Parent module "${parentPascal}" with ${subModules.length} sub-modules generated!\n`,
  );
  console.log(`⚠️  Next steps:`);
  console.log(
    `   1. Add "${schemaName}" to DbSchemas enum in src/shared/schemas.ts`,
  );
  console.log(`   2. Add path aliases in tsconfig.json:`);
  for (const s of subModules) {
    console.log(
      `      "@${parentKebab}/${s.kebab}/*": ["src/modules/${parentKebab}/${s.kebab}/*"]`,
    );
  }
  console.log(`   3. Register ${parentPascal}Module in app.module.ts`);
  console.log(`   4. Add ORM entities to the entities array in app.module.ts:`);
  for (const s of subModules) {
    console.log(`      ${s.pascal}OrmEntity`);
  }
  console.log(
    `   5. Generate migrations: npm run migration:generate --name=Create${parentPascal}Tables`,
  );
  console.log(`   6. Run migrations: npm run migration:run\n`);
}

main().catch(console.error);
