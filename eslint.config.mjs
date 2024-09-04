import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
/**
 * Этот файл конфигурации ESLint настраивает линтер для проекта, использующего TypeScript,
 * с учетом специфических правил и глобальных переменных для Node.js и Jest.
 
 * Импортируются необходимые модули и плагины для настройки ESLint:

 *   - @typescript-eslint/eslint-plugin — плагин для поддержки TypeScript.
 *   - globals — глобальные переменные для различных сред (например, Node.js, Jest).
 *   - @typescript-eslint/parser — парсер для TypeScript.
 *   - node:path и node:url — модули Node.js для работы с путями и URL.
 *   - @eslint/js — конфигурации ESLint для JavaScript.
 *   - FlatCompat из @eslint/eslintrc — утилита для совместимости с конфигурациями ESLint.
 */
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Определяются текущий файл и директория, в которой он находится, используя fileURLToPath и path.dirname.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Создается объект FlatCompat для совместимости с конфигурациями ESLint.
 * Указываются базовая директория и рекомендуемые конфигурации из @eslint/js.
 */
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  /**
   * compat.extends(...):
   *
   *  compat — это объект, созданный с помощью класса FlatCompat из модуля @eslint/eslintrc.
   *  Этот объект используется для обеспечения совместимости с конфигурациями ESLint.
   *  Метод extends используется для расширения текущей конфигурации ESLint с помощью других конфигураций или плагинов.
   *
   * Для чего это нужно
   *
   * Совместимость:
   *    Использование compat.extends позволяет легко интегрировать рекомендованные конфигурации плагинов в текущую конфигурацию ESLint, обеспечивая совместимость и упрощая настройку.
   *     Качество кода: Рекомендованные конфигурации плагинов @typescript-eslint и prettier помогают поддерживать высокий стандарт качества кода, следуя лучшим практикам и стандартам.
   *     Форматирование: Интеграция с Prettier обеспечивает единообразное форматирование кода, что делает его более читаемым и поддерживаемым.Для чего это нужно
   */
  ...compat.extends(
    /**
     * plugin:@typescript-eslint/recommended:
     *
     *  Это рекомендованная конфигурация для плагина @typescript-eslint.
     *  Она включает в себя набор правил, которые помогают улучшить качество кода TypeScript,
     *  обеспечивая соответствие лучшим практикам и стандартам.
     */
    'plugin:@typescript-eslint/recommended',
    /**
     * plugin:@typescript-eslint/recommended-requiring-type-checking:
     *
     *  Это рекомендованная конфигурация для плагина prettier.
     *  Она включает в себя правила, которые помогают форматировать код в соответствии с настройками Prettier.
     *  Также отключает правила ESLint, которые могут конфликтовать с Prettier, чтобы избежать дублирующихся или противоречивых проверок.
     */
    'plugin:prettier/recommended',
  ),
  {
    plugins: {
      /**
       * Плагин @typescript-eslint используется для интеграции TypeScript с ESLint.
       * Он предоставляет набор правил и возможностей, которые помогают улучшить качество кода, написанного на TypeScript.
       *
       * Для чего это нужно
       *
       *  Качество кода: Плагин помогает поддерживать высокий стандарт качества кода, следуя лучшим практикам и стандартам TypeScript.
       *  Поиск ошибок: Плагин помогает находить и исправлять ошибки в коде на этапе разработки, что снижает количество багов и улучшает стабильность приложения.
       *  Соблюдение стиля: Плагин помогает соблюдать единый стиль кода, что делает его более читаемым и поддерживаемым.
       */
      '@typescript-eslint': tsEslintPlugin,
    },
    /**
     * Настройки языковых переменных
     */
    languageOptions: {
      /**
       * Глобальные переменные для Node.js и Jest.
       */
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      /**
       * Парсер TypeScript.
       */
      parser: tsParser,
      //ECMAScript версия 5.
      ecmaVersion: 5,
      //Тип модуля — module.
      sourceType: 'module',
      //Опции парсера, включая проект tsconfig.json и корневую директорию __dirname.
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // Отключает правило, требующее префикс "I" для имен интерфейсов.
      '@typescript-eslint/interface-name-prefix': 'off',

      // Отключает правило, требующее явного указания возвращаемого типа для функций.
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Отключает правило, требующее явного указания типов на границах модулей.
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Отключает правило, запрещающее использование типа "any".
      '@typescript-eslint/no-explicit-any': 'off',

      // Отключает встроенное правило ESLint, запрещающее неиспользуемые переменные.
      'no-unused-vars': 'off',

      // Включает правило TypeScript ESLint, запрещающее неиспользуемые переменные, с уровнем ошибки.
      '@typescript-eslint/no-unused-vars': ['error'],

      // Отключает встроенное правило ESLint, требующее использования "await" в асинхронных функциях.
      'require-await': 'off',

      // Включает правило TypeScript ESLint, требующее использования "await" в асинхронных функциях, с уровнем ошибки.
      '@typescript-eslint/require-await': 'error',

      // Включает правило TypeScript ESLint, запрещающее неуправляемые промисы, с уровнем ошибки.
      '@typescript-eslint/no-floating-promises': 'error',

      // Включает правило, запрещающее определенные синтаксические конструкции.
      'no-restricted-syntax': [
        'error',
        {
          // Запрещает вызовы configService.get() и configService.getOrThrow() без { infer: true }.
          selector:
            'CallExpression[callee.object.name=configService][callee.property.name=/^(get|getOrThrow)$/]:not(:has([arguments.1] Property[key.name=infer][value.value=true])), CallExpression[callee.object.property.name=configService][callee.property.name=/^(get|getOrThrow)$/]:not(:has([arguments.1] Property[key.name=infer][value.value=true]))',
          message:
            'Add "{ infer: true }" to configService.get() for correct typechecking. Example: configService.get("database.port", { infer: true })',
        },
        {
          // Запрещает использование "it" в тестах, если строка не начинается с "should".
          selector:
            'CallExpression[callee.name=it][arguments.0.value!=/^should/]',
          message: '"it" should start with "should"',
        },
      ],
    },
  },
];
