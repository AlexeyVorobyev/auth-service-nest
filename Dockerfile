#1. Билд
FROM node:latest AS builder
#2. Установка рабочего каталога
WORKDIR /app
#3. Копируем конфиг
COPY package*.json ./
COPY yarn.lock ./
#4. Установка зависимостей
RUN yarn
#5. Копируем основные файлы проекта
COPY . .

ENV ADMIN_PASSWORD admin
ENV ADMIN_EMAIL admin@admin.com

RUN yarn command-nest base-roles-init
RUN yarn command-nest create-super-user -password --password="${ADMIN_PASSWORD}" -email --email="${ADMIN_EMAIL}"

#6. Билдим проект
RUN yarn build

FROM node:latest

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist

EXPOSE 8081

CMD [ "yarn", "serve:prod" ]