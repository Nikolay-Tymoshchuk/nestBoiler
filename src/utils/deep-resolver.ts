/**
 * Функция для рекурсивного разрешения всех промисов в структуре данных.
 * @param input - Входные данные, которые могут содержать промисы.
 * @returns Возвращает данные с разрешенными промисами.
 */
async function deepResolvePromises(input) {
  // Если входные данные являются промисом, ждем его разрешения и возвращаем результат
  if (input instanceof Promise) {
    return await input;
  }

  // Если входные данные являются массивом, рекурсивно разрешаем все промисы в массиве
  if (Array.isArray(input)) {
    const resolvedArray = await Promise.all(input.map(deepResolvePromises));
    return resolvedArray;
  }

  // Если входные данные являются объектом Date, возвращаем их без изменений
  if (input instanceof Date) {
    return input;
  }

  // Если входные данные являются объектом (и не null), рекурсивно разрешаем все промисы в его свойствах
  if (typeof input === 'object' && input !== null) {
    const keys = Object.keys(input); // Получаем все ключи объекта
    const resolvedObject = {}; // Создаем новый объект для хранения разрешенных значений

    // Для каждого ключа объекта рекурсивно разрешаем промисы в значениях
    for (const key of keys) {
      const resolvedValue = await deepResolvePromises(input[key]);
      resolvedObject[key] = resolvedValue;
    }

    return resolvedObject; // Возвращаем объект с разрешенными значениями
  }

  // Если входные данные не являются промисом, массивом, объектом Date или объектом, возвращаем их без изменений
  return input;
}

// Экспортируем функцию deepResolvePromises по умолчанию
export default deepResolvePromises;
