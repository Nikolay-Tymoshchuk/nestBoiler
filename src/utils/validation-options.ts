// Импортируем необходимые модули и типы из библиотеки @nestjs/common
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';

/**
 * Функция для генерации ошибок в удобочитаемом формате.
 * @param errors - Массив объектов ValidationError, содержащих информацию об ошибках валидации.
 * @returns Объект, где ключи - это свойства с ошибками, а значения - сообщения об ошибках.
 */
function generateErrors(errors: ValidationError[]) {
  return errors.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue.property]:
        (currentValue.children?.length ?? 0) > 0
          ? generateErrors(currentValue.children ?? []) // Рекурсивно обрабатываем дочерние ошибки
          : Object.values(currentValue.constraints ?? {}).join(', '), // Объединяем сообщения об ошибках в строку
    }),
    {},
  );
}

// Опции для ValidationPipe, используемого в NestJS для валидации данных
const validationOptions: ValidationPipeOptions = {
  transform: true, // Автоматически преобразовывать входные данные в нужный тип
  whitelist: true, // Удалять свойства, которых нет в DTO
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, // Устанавливаем HTTP статус код для ошибок валидации
  exceptionFactory: (errors: ValidationError[]) => {
    // Фабрика для создания исключений на основе ошибок валидации
    return new UnprocessableEntityException({
      status: HttpStatus.UNPROCESSABLE_ENTITY, // Устанавливаем статус код
      errors: generateErrors(errors), // Генерируем объект ошибок в удобочитаемом формате
    });
  },
};

// Экспортируем объект validationOptions по умолчанию
export default validationOptions;
