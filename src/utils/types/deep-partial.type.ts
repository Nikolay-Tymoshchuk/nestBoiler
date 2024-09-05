/**
 * Тип DeepPartial<T> рекурсивно обрабатывает все уровни вложенности.
 * Это означает, что он будет работать с объектами любой глубины вложенности,
 * делая все свойства и вложенные свойства необязательными.
 *
 *  Пример с несколькими уровнями вложенности:
 *  type ComplexObject = {
 *     id: number;
 *     name: string;
 *     details: {
 *       description: string;
 *       metadata: {
 *         createdBy: string;
 *         createdAt: Date;
 *       };
 *     };
 *   };
 *
 *   // Применение DeepPartial к типу ComplexObject
 *   type PartialComplexObject = DeepPartial<ComplexObject>;
 *
 *   // Пример объекта PartialComplexObject
 *   const partialComplexObject: PartialComplexObject = {
 *     name: "Sample Object", // Можно указать только имя
 *     details: {
 *       metadata: {
 *         createdBy: "User123", // Можно указать только createdBy
 *       },
 *     },
 *   };
 */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
