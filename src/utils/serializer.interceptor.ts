// Импортируем необходимые декораторы и интерфейсы из @nestjs/common
import {
  Injectable, // Декоратор для обозначения класса как провайдера, который может быть внедрен в другие классы
  NestInterceptor, // Интерфейс для создания перехватчиков (интерсепторов) в NestJS
  ExecutionContext, // Интерфейс для доступа к контексту выполнения текущего запроса
  CallHandler, // Интерфейс для обработки вызовов в перехватчике
} from '@nestjs/common';

// Импортируем Observable из библиотеки rxjs
import { Observable } from 'rxjs';

// Импортируем оператор map из библиотеки rxjs для преобразования данных в потоке
import { map } from 'rxjs/operators';

// Импортируем функцию deepResolvePromises для рекурсивного разрешения всех промисов в структуре данных
import deepResolvePromises from './deep-resolver';

@Injectable() // Декоратор, который делает класс провайдером, доступным для внедрения
export class ResolvePromisesInterceptor implements NestInterceptor {
  /**
   * Метод intercept перехватывает выполнение запроса и позволяет изменить или дополнить его.
   * @param context - Контекст выполнения текущего запроса.
   * @param next - Обработчик вызова, который передает управление следующему обработчику в цепочке.
   * @returns Observable с данными, в которых все промисы разрешены.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    // Используем оператор map для преобразования данных в потоке
    return next.handle().pipe(
      // Применяем функцию deepResolvePromises к данным, чтобы рекурсивно разрешить все промисы
      map((data) => deepResolvePromises(data)),
    );
  }
}
