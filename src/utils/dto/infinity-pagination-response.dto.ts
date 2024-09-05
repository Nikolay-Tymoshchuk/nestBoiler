import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

// Класс для ответа с бесконечной пагинацией
export class InfinityPaginationResponseDto<T> {
  @ApiProperty({ type: [Object] }) // Описываем свойство data для документации Swagger
  data: T[];

  @ApiProperty({ type: Boolean, example: true }) // Описываем свойство hasNextPage для документации Swagger
  hasNextPage: boolean;
}

/**
 * Функция для создания класса ответа с бесконечной пагинацией.
 * @param classReference - Ссылка на класс, который будет использоваться в качестве типа данных.
 * @returns Класс, расширяющий InfinityPaginationResponseDto с указанным типом данных.
 */
export function InfinityPaginationResponse<T>(classReference: Type<T>) {
  // Абстрактный класс для пагинации
  abstract class Pagination {
    @ApiProperty({ type: [classReference] }) // Описываем свойство data для документации Swagger
    data!: T[];

    @ApiProperty({
      type: Boolean,
      example: true,
    }) // Описываем свойство hasNextPage для документации Swagger
    hasNextPage: boolean;
  }

  // Устанавливаем имя класса для абстрактного класса Pagination
  Object.defineProperty(Pagination, 'name', {
    writable: false, // Имя класса не может быть изменено
    value: `InfinityPagination${classReference.name}ResponseDto`, // Устанавливаем имя класса
  });

  // Возвращаем абстрактный класс Pagination
  return Pagination;
}
