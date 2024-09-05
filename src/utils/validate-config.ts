// Импортируем необходимые функции и типы из библиотек class-transformer и class-validator
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ClassConstructor } from 'class-transformer/types/interfaces';

/**
 * Функция для валидации конфигурации.
 * @param config - Объект конфигурации, который нужно валидировать.
 * @param envVariablesClass - Класс, используемый для преобразования и валидации конфигурации.
 * @returns Возвращает валидированный и преобразованный объект конфигурации.
 * @throws Выбрасывает ошибку, если валидация не прошла.
 */
function validateConfig<T extends object>(
  config: Record<string, unknown>, // Объект конфигурации, который нужно валидировать
  envVariablesClass: ClassConstructor<T>, // Класс для преобразования и валидации конфигурации
) {
  // Преобразуем plain объект конфигурации в экземпляр класса envVariablesClass
  const validatedConfig = plainToClass(envVariablesClass, config, {
    enableImplicitConversion: true, // Включаем неявное преобразование типов
  });

  // Валидируем преобразованный объект
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false, // Не пропускать отсутствующие свойства
  });

  // Если есть ошибки валидации, выбрасываем ошибку
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  // Возвращаем валидированный и преобразованный объект конфигурации
  return validatedConfig;
}

// Экспортируем функцию validateConfig по умолчанию
export default validateConfig;
