# Используем официальный образ Node.js версии 20.17.0 на базе Alpine Linux
FROM node:20.17.0-alpine

# Устанавливаем bash без кэша
RUN apk add --no-cache bash

# Устанавливаем глобально NestJS CLI, TypeScript и ts-node
RUN npm i -g @nestjs/cli typescript ts-node

# Копируем файлы package.json и package-lock.json в временную директорию /tmp/app/
COPY package*.json /tmp/app/

# Переходим в директорию /tmp/app и устанавливаем зависимости
RUN cd /tmp/app && npm install

# Копируем все файлы и директории из текущей директории в /usr/src/app
COPY . /usr/src/app

# Копируем установленные зависимости из временной директории в рабочую директорию
RUN cp -a /tmp/app/node_modules /usr/src/app

# Копируем скрипт wait-for-it.sh в директорию /opt/
COPY ./wait-for-it.sh /opt/wait-for-it.sh

# Делаем скрипт wait-for-it.sh исполняемым
RUN chmod +x /opt/wait-for-it.sh

# Копируем скрипт startup.relational.dev.sh в директорию /opt/
COPY ./startup.relational.dev.sh /opt/startup.relational.dev.sh

# Делаем скрипт startup.relational.dev.sh исполняемым
RUN chmod +x /opt/startup.relational.dev.sh

# Удаляем символы возврата каретки из скрипта wait-for-it.sh (для совместимости с Unix)
RUN sed -i 's/\r//g' /opt/wait-for-it.sh

# Удаляем символы возврата каретки из скрипта startup.relational.dev.sh (для совместимости с Unix)
RUN sed -i 's/\r//g' /opt/startup.relational.dev.sh

# Устанавливаем рабочую директорию в /usr/src/app
WORKDIR /usr/src/app

# Если файл .env не существует, копируем env-example-relational в .env
RUN if [ ! -f .env ]; then cp env-example-relational .env; fi

# Собираем проект
RUN npm run build

# Устанавливаем команду по умолчанию для запуска контейнера
CMD ["/opt/startup.relational.dev.sh"]