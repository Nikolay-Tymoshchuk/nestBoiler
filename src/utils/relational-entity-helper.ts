import { instanceToPlain } from 'class-transformer';
import { AfterLoad, BaseEntity } from 'typeorm';

// Класс EntityRelationalHelper наследует от BaseEntity
export class EntityRelationalHelper extends BaseEntity {
  // Опциональное свойство для хранения имени сущности
  __entity?: string;

  //Декоратор AfterLoad указывает, что метод setEntityName будет вызван после загрузки сущности из базы данных
  @AfterLoad()
  setEntityName() {
    /**
     * В методе setEntityName используется this.constructor.name для получения имени класса.
     * this.constructor.name работает, даже если конструктор явно не определен в классе,
     * потому что каждый класс в JavaScript имеет неявный конструктор, если явный не указан.
     *
     * Пример:
     *  const entity = new SomeEntity();
     *  entity.id = 1;
     *  entity.name = 'Example';
     *
     *  // После загрузки из базы данных
     *    entity.setEntityName();
     *    console.log(entity.__entity); // Выведет 'SomeEntity'
     */
    this.__entity = this.constructor.name;
  }

  // Метод toJSON используется для преобразования сущности в plain объект
  toJSON() {
    // Преобразуем экземпляр класса в plain объект с помощью instanceToPlain
    return instanceToPlain(this);
  }
}
