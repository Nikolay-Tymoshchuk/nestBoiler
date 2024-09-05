# wait-for-it.sh

`wait-for-it.sh` — это скрипт на Bash, который используется для проверки доступности TCP-сервиса по указанному хосту и порту. Скрипт ждет, пока указанный сервис не станет доступен, и может выполнить команду после этого. Этот скрипт полезен в сценариях, где необходимо убедиться, что определенный сервис (например, база данных или API) запущен и доступен перед запуском другого процесса или приложения.

## Основные возможности

1. **Проверка доступности TCP-сервиса:**
   Скрипт проверяет, открыт ли указанный порт на указанном хосте. Если порт открыт, значит сервис работает и доступен для подключения.

2. **Задание таймаута ожидания:**
   Позволяет задать максимальное время ожидания, по истечении которого скрипт прекратит попытки подключиться и завершится с ошибкой, если сервис не станет доступен.

3. **Выполнение команды после проверки:**
   Скрипт может выполнять указанную команду только после успешной проверки доступности сервиса. Это полезно, если нужно подождать, пока зависимый сервис станет доступным, прежде чем запускать приложение.

## Синтаксис использования

```bash
wait-for-it.sh host:port [-s] [-t timeout] [-- command args]
```

## Параметры

- `host:port`: Хост и порт, доступность которых необходимо проверить.
- `-h HOST | --host=HOST`: Указывает хост или IP-адрес для проверки.
- `-p PORT | --port=PORT`: Указывает TCP-порт для проверки.
- `-s | --strict`: Запускает команду только в случае успешной проверки.
- `-q | --quiet`: Отключает вывод статуса.
- `-t TIMEOUT | --timeout=TIMEOUT`: Устанавливает таймаут ожидания в секундах (по умолчанию 15 секунд). Если `0`, то ожидание будет бесконечным.
- `-- COMMAND ARGS`: Команда, которую нужно выполнить после успешной проверки.

## Примеры использования

1. **1. Простой пример: проверка доступности сервиса:**
   Ожидание доступности сервиса на localhost:3306 (например, MySQL) с таймаутом 30 секунд:

   ```bash
   ./wait-for-it.sh localhost:3306 -t 30
   ```

2. **2. Выполнение команды после проверки доступности:**
   Ожидание доступности сервиса на localhost:5432 (например, PostgreSQL), затем запуск команды python app.py:

   ```bash
    ./wait-for-it.sh localhost:5432 -- python app.py
   ```

3. **3. Тихий режим и строгий режим:**
   Ожидание доступности сервиса на my-service:8080 в тихом режиме и с таймаутом 60 секунд. Команда будет выполнена только в случае успеха:

   ```bash
    ./wait-for-it.sh my-service:8080 -q -s -t 60 -- echo "Service is up!"
   ```

## Как работает скрипт

1. **1. Проверка аргументов и настройка переменных:**
   Скрипт разбирает аргументы командной строки и инициализирует переменные, такие как хост, порт, таймаут и режимы работы.
2. **2. Функция wait_for:**
   Основная функция, которая выполняет проверку доступности порта. Она пытается подключиться к заданному хосту и порту. Если подключение успешно, функция завершает выполнение, иначе повторяет попытку.
3. **3. Функция wait_for_wrapper:**
   Вспомогательная функция, которая обрабатывает таймаут, поддерживая остановку скрипта при его достижении.
4. **4. Основной цикл выполнения:**
   В зависимости от аргументов, либо ждет доступности сервиса и выполняет команду, либо завершает выполнение с ошибкой в случае неуспеха.