import { DomainError } from './domain-error.exception';

export class PageOutOfRangeException extends DomainError {
  constructor(page: number, totalPages: number) {
    super(`Page ${page} is out of range. Total pages: ${totalPages}`);
  }
}
