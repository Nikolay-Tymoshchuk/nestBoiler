import { IPaginationOptions } from './types/pagination-options';
import { InfinityPaginationResponseDto } from './dto/infinity-pagination-response.dto';

/**
 * Функция для создания ответа с бесконечной пагинацией.
 * @param data - Массив данных, которые нужно пагинировать.
 * @param options - Опции пагинации, включающие лимит элементов на страницу.
 * @returns Объект типа InfinityPaginationResponseDto, содержащий данные и флаг наличия следующей страницы.
 */
export const infinityPagination = <T>(
  data: T[], // Массив данных, которые нужно пагинировать
  options: IPaginationOptions, // Опции пагинации, включающие лимит элементов на страницу
): InfinityPaginationResponseDto<T> => {
  // Возвращаем объект с данными и флагом наличия следующей страницы
  return {
    data, // Массив данных
    hasNextPage: data.length === options.limit, // Флаг наличия следующей страницы
  };
};
