/**
 * Clase base para modelos de dominio.
 *
 * Genera getters de solo lectura automáticamente a partir de las `props`.
 * Cada subclase concreta debe agregar declaration merging para que
 * TypeScript conozca los getters:
 *
 * ```ts
 * export interface User extends Readonly<UserProps> {}
 * export class User extends DomainModel<UserProps> { … }
 * ```
 */
export abstract class DomainModel<T extends Record<string, any>> {
  protected readonly props: T;

  protected constructor(props: T) {
    this.props = props;

    for (const key of Object.keys(props)) {
      if (!(key in this)) {
        Object.defineProperty(this, key, {
          get: () => this.props[key] as T[typeof key],
          enumerable: true,
        });
      }
    }
  }

  abstract toPrimitives(): Record<string, any>;
}
