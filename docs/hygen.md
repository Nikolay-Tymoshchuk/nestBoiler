# Hygen - инструмент для генерации контента в проекте

## Структура папки .hygen

```txt
.hygen/
│
├── generate/
│   ├── all-db-resource/
│   │   ├── app-module-import.ejs.t
│   │   ├── app-module.ejs.t
│   │   ├── controller.ejs.t
│   │   ├── module.ejs.t
│   │   ├── service.ejs.t
│   │   ├── domain/
│   │   │   └── domain.ejs.t
│   │   ├── dto/
│   │   │   ├── create.dto.ejs.t
│   │   │   ├── find-all.dto.ejs.t
│   │   │   └── update.dto.ejs.t
│   │   └── infrastructure/
│   │       └── persistence/
│   │           ├── relational/
│   │           │   ├── entities/
│   │           │   │   └── entity.ejs.t
│   │           │   ├── mappers/
│   │           │   │   └── mapper.ejs.t
│   │           │   └── repositories/
│   │           │       └── repository.ejs.t
|   |           └── document/ (аналогичная структура)
│   ├── document-resource/ (аналогичная структура)
│   └── relational-resource/ (аналогичная структура)
│
│
├── property/
│   ├── add-to-all-db/
│   │   ├── prompt.js
│   │   ├── domain/
│   │   │   └── domain.ejs.t
│   │   ├── dto/
│   │   │   ├── 01-create.dto.ejs.t
│   │   │   ├── 02-create-import-class-validator.dto.ejs.t
│   │   │   ├── 03-create-boolean.dto.ejs.t
│   │   │   ├── 04-create-number.dto.ejs.t
│   │   │   ├── 05-create-string.dto.ejs.t
│   │   │   ├── 06-create-import-swagger.dto.ejs.t
│   │   │   └── 07-create-api-property.dto.ejs.t
│   │   └── infrastructure/
│   │       └── persistence/
│   │           ├── document/
│   │           │   ├── entities/
│   │           │   │   ├── entity-column.ejs.t
│   │           │   │   └── entity.ejs.t
│   │           │   └── mappers/
│   │           │       ├── mapper-domain.ejs.t
│   │           │       └── mapper-persistence.ejs.t
│   │           └── relational/
│   │               ├── entities/
│   │               │   ├── entity-column.ejs.t
│   │               │   └── entity.ejs.t
│   │               └── mappers/
│   │                   ├── mapper-domain.ejs.t
│   │                   └── mapper-persistence.ejs.t
│   ├── add-to-document/ (аналогичная структура)
│   └── add-to-relational/ (аналогичная структура)
│
└── seeds/
    ├── create-relational/
    │   ├── module.ejs.t
    │   ├── run-seed-import.ejs.t
    │   ├── run-seed-service.ejs.t
    │   ├── seed-module-import.ejs.t
    │   ├── seed-module-import.ejs.t
    │   └── service.ejs.t
    └── create-document/ (аналогичная структура)
```

---

## Скрипты для генерации контента

**"seed:create:relational": "hygen seeds create-relational"**

```bash
npm run seed:create:relational

```

Этот скрипт запускает генерацию с использованием шаблонов из папки .hygen/seeds/create-relational. Он отвечает за создание seed-скриптов для работы с реляционной базой данных. В сгенерированных файлах содержатся модули, сервисы и другие компоненты для запуска начальных данных (seeds).

>>Скрипт ***"seed:create:document": "hygen seeds create-document"*** работает аналогично, но для типов, взаимодействующих с нереляционными базами данных

---

**"generate:resource:relational": "hygen generate relational-resource"**

```bash
npm run generate:resource:relational

```

Этот скрипт запускает генерацию с использованием шаблонов из папки .hygen/seeds/create-relational. Он отвечает за создание seed-скриптов для работы с реляционной базой данных. В сгенерированных файлах содержатся модули, сервисы и другие компоненты для запуска начальных данных (seeds).

>>Скрипты **"generate:resource:document": "hygen generate document-resource"** и **"generate:resource:all-db": "hygen generate all-db-resource"** работают аналогично, но для типов, взаимодействующих с нереляционными базами данных и для всех типов баз данных соответственно

---

**"add:property:to-relational": "hygen property add-to-relational"**

```bash
npm run add:property:to-relational

```

Этот скрипт запускает генерацию с использованием шаблонов из папки .hygen/property/add-to-relational. Он отвечает за добавление новых свойств в сущности реляционной базы данных. В сгенерированных файлах содержатся новые свойства для сущностей, а также DTO и мапперы для работы с ними.

>>Скрипты **"add:property:to-document": "hygen property add-to-document"** и **"add:property:to-all-db": "hygen property add-to-all-db"** работают аналогично, но для типов, взаимодействующих с нереляционными базами данных и для всех типов баз данных соответственно.

---

## Общая логика структуры

* *generate*: отвечает за создание основных компонентов для работы в зависимости от типа баз данных, с которыми взаимодействуем на проекте. Это модули, контроллеры, сервисы, репозитории и др.
* *property*: предназначена для добавления новых полей (свойств) в различные базы данных, будь то реляционные или нет.
* *seeds*: хранит шаблоны для создания начальных данных (seeds) для баз данных.

---

Каждая из папок содержит шаблоны .ejs.t, которые используются для динамической генерации кода, что позволяет автоматизировать создание повторяющихся компонентов проекта.
