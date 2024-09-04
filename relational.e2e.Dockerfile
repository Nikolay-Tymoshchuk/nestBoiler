# Базовый образ: используется официальный образ Node.js версии 20.17.0 на основе Alpine Linux.
# Alpine — это легковесная дистрибуция Linux, что делает итоговый Docker-образ компактным.
FROM node:20.17.0-alpine

# Устанавливается Bash через пакетный менеджер Alpine apk.
# Опция --no-cache используется, чтобы избежать кеширования промежуточных данных и сократить размер образа.
RUN apk add --no-cache bash

# Устанавливаются глобально (с помощью флага -g) необходимые инструменты:
#	•	@nestjs/cli: CLI для создания и управления проектами на NestJS.
#	•	typescript: компилятор TypeScript.
#	•	ts-node: интерпретатор TypeScript для выполнения .ts файлов без предварительной компиляции.
RUN npm i -g @nestjs/cli typescript ts-node

# Копируются файлы package.json и package-lock.json в директорию /tmp/app/ внутри контейнера.
# Это необходимо для установки зависимостей.
COPY package*.json /tmp/app/

# Переход в директорию /tmp/app и установка всех зависимостей, указанных в package.json.
# После этого зависимости будут закэшированы в этой директории.
RUN cd /tmp/app && npm install

# Копируется весь код проекта в директорию /usr/src/app контейнера.
# Этот шаг происходит после установки зависимостей, чтобы использовать Docker-кеш и сократить время сборки,
# если package.json не изменялся.
COPY . /usr/src/app

# Копирует директорию node_modules из временной директории /tmp/app в рабочую директорию приложения /usr/src/app.
RUN cp -a /tmp/app/node_modules /usr/src/app

# Копирует локальный файл wait-for-it.sh в контейнер по пути /opt/wait-for-it.sh.
COPY ./wait-for-it.sh /opt/wait-for-it.sh

# Делает скрипт wait-for-it.sh исполняемым.
RUN chmod +x /opt/wait-for-it.sh

# Копирует локальный файл startup.relational.ci.sh в контейнер по пути /opt/startup.relational.ci.sh.
COPY ./startup.relational.ci.sh /opt/startup.relational.ci.sh

# Делает скрипт startup.relational.ci.sh исполняемым.
RUN chmod +x /opt/startup.relational.ci.sh

# Удаляет все символы возврата каретки \r из файла wait-for-it.sh.
# Это полезно, если файл был создан в Windows и имеет символы конца строки в стиле Windows (\r\n),
# которые могут вызвать проблемы в Linux.
RUN sed -i 's/\r//g' /opt/wait-for-it.sh

# То же самое действие для файла startup.relational.test.sh.
RUN sed -i 's/\r//g' /opt/startup.relational.ci.sh

# Устанавливает рабочую директорию для всех последующих команд в /usr/src/app.
# Теперь все команды будут выполняться относительно этой директории.
WORKDIR /usr/src/app

# Создает пустой .env файл в рабочей директории.
# Это сделано для того, чтобы избежать ошибок в случае отсутствия этого файла.
RUN echo "" > .env

# Запускает команду npm run build для сборки проекта.
RUN npm run build

# Устанавливает команду, которая будет выполнена при запуске контейнера,
# а именно скрипт /opt/startup.relational.ci.sh.
CMD ["/opt/startup.relational.ci.sh"]
