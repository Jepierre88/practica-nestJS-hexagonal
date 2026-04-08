/**
 * Clase base para modelos de dominio.
 *
 * Genera getters de solo lectura automáticamente a partir de las `props`.
 * Cada subclase concreta DEBE agregar una línea de declaration merging
 * para que TypeScript conozca los getters en compilación:
 *
 * ```ts
 * export interface User extends DomainProps<UserProps> {}
 * export class User extends DomainModel<UserProps> { … }
 * ```
 *
 * Esto es una limitación de TypeScript: `Readonly<T>` con genéricos
 * no puede resolverse en la clase base, pero sí en cada subclase
 * donde T es concreto.
 */
export type DomainProps<T> = Readonly<T>;

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
