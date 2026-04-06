/**
 * Clase base abstracta para mappers de DTOs de respuesta.
 * @template Domain      - Modelo de dominio
 * @template ResponseDto - DTO de respuesta hacia el cliente
 */
export abstract class DtoMapper<Domain, ResponseDto> {
  abstract toResponse(domain: Domain): ResponseDto;
  abstract toResponseList(domains: Domain[]): ResponseDto[];
}
