<%--Метаданные Hygen

inject: true:
    Указывает, что содержимое этого шаблона должно быть вставлено в существующий файл, а не создавать новый файл.

to::
    Указывает путь к файлу, в который будет вставлено содержимое. Путь включает динамически генерируемые части, основанные на значении переменной name.

after::
    Указывает, что содержимое должно быть вставлено после строки export class Create<%= name %>Dto. Это позволяет вставлять новые свойства в существующий класс DTO.

 --%>


---
inject: true
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto.ts
after: export class Create<%= name %>Dto
---

<% if (isAddToDto) { -%>
  @ApiProperty()
  <% if (type === 'string') { -%>
  @IsString()
  <% } -%>
  <% if (type === 'number') { -%>
  @IsNumber()
  <% } -%>
  <% if (type === 'boolean') { -%>
  @IsBoolean()
  <% } -%>
  <%= property %>: <%= type %>;
<% } -%>

<%-- 
Пример использования
Предположим, что переменные имеют следующие значения:

name: User
isAddToDto: true
property: age
type: number
Тогда сгенерированный код будет выглядеть следующим образом:

export class CreateUserDto {
  @ApiProperty()
  @IsNumber()
  age: number;
}
 --%>
