export abstract class DomainModel {
  abstract toPrimitives(): Record<string, any>;
}