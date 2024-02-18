#1. Билд
FROM node:latest AS builder
#2. Установка рабочего каталога
WORKDIR /app
#3. Копируем конфиг
COPY package*.json ./
#4. Установка зависимостей
RUN npm install --force
#5. Копируем основные файлы проекта
COPY . .
#6. Билдим проект
RUN npm run build

FROM node:latest

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "serve:prod" ]