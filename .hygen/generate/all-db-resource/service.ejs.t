<%--Этот блок в самом начале файла является метаданными, используемыми инструментом Hygen. 

---: 
    Три дефиса указывают на начало и конец блока метаданных.

to::
    Указывает путь, куда будет сгенерирован файл. В данном случае, путь включает динамически генерируемые части, основанные на значении переменной name.
<%= ... %>:
    Это синтаксис EJS (Embedded JavaScript) для вставки значений переменных или выполнения JavaScript кода внутри шаблона.

h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']):
    - h.inflection.transform — это функция, которая выполняет различные преобразования строки.
    - name — переменная, значение которой передается в шаблон.
    - ['pluralize', 'underscore', 'dasherize'] — массив преобразований, которые будут применены к name:
        pluralize — преобразует строку во множественное число (UserFeature -> UserFeatures).
        underscore — преобразует строку в нижний регистр с подчеркиваниями (UserFeatures => user_features).
        dasherize — преобразует строку в нижний регистр с дефисами (user_features => user-features). 

Пример

  Если переменная name имеет значение User, то путь будет преобразован следующим образом:

  h.inflection.transform('User', ['pluralize', 'underscore', 'dasherize']) преобразуется в users.
  Итоговый путь будет: src/users/users.service.ts.
 --%>


---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service.ts
---
<%-- Импортируем необходимые модули и классы --%>
import { Injectable } from '@nestjs/common';
import { Create<%= name %>Dto } from './dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';
import { Update<%= name %>Dto } from './dto/update-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';
import { <%= name %>Repository } from './infrastructure/persistence/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { <%= name %> } from './domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';

@Injectable()
export class <%= h.inflection.transform(name, ['pluralize']) %>Service {
  constructor(private readonly <%= h.inflection.camelize(name, true) %>Repository: <%= name %>Repository) {}

  create(create<%= name %>Dto: Create<%= name %>Dto) {
    return this.<%= h.inflection.camelize(name, true) %>Repository.create(create<%= name %>Dto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.<%= h.inflection.camelize(name, true) %>Repository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  <%-- Метод для получения одной записи по идентификатору --%>
  findOne(id: <%= name %>['id']) {
    return this.<%= h.inflection.camelize(name, true) %>Repository.findById(id);
  }

  <%-- Метод для обновления записи по идентификатору --%>
  update(id: <%= name %>['id'], update<%= name %>Dto: Update<%= name %>Dto) {
    return this.<%= h.inflection.camelize(name, true) %>Repository.update(id, update<%= name %>Dto);
  }

  <%-- Метод для удаления записи по идентификатору --%>
  remove(id: <%= name %>['id']) {
    return this.<%= h.inflection.camelize(name, true) %>Repository.remove(id);
  }
}