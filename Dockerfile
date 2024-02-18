#1. Билд
FROM node:latest AS builder
#2. Установка рабочего каталога
WORKDIR /app
#3. Копируем конфиг
COPY package*.json ./
COPY yarn.lock ./
#4. Установка зависимостей
RUN npm install -g yarn
RUN yarn install --force
#5. Копируем основные файлы проекта
COPY . .
#6. Билдим проект
RUN yarn build

ENV ADMIN_PASSWORD admin
ENV ADMIN_EMAIL admin@admin.com

CMD yarn command-nest base-roles-init \
&& yarn command-nest create-super-user -password --password="${ADMIN_PASSWORD}" -email --email="${ADMIN_EMAIL}"

FROM node:latest
RUN npm install -g yarn

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist

EXPOSE 8081

CMD [ "yarn", "serve:prod" ]