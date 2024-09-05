import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class EntityDocumentHelper {
  // Описываем свойство _id для документации Swagger
  @ApiProperty({
    type: String, // Указываем, что тип свойства _id - строка
  })
  // Применяем трансформацию к свойству _id
  @Transform(
    (value) => {
      // Проверяем, есть ли свойство 'value' в объекте value
      if ('value' in value) {
        // Если есть, возвращаем значение свойства _id как строку
        // https://github.com/typestack/class-transformer/issues/879
        return value.obj[value.key].toString();
      }

      // Если свойства 'value' нет, возвращаем строку 'unknown value'
      return 'unknown value';
    },
    {
      toPlainOnly: true, // Применяем трансформацию только при преобразовании в plain объект
    },
  )
  public _id: string; // Объявляем публичное свойство _id типа string
}
