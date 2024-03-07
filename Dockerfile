FROM node:16.20 as builder
LABEL authors="hanjiawei"

# 设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN mkdir app
WORKDIR /app

COPY package.json .
RUN npm install --registry=http://mirrors.cloud.tencent.com/npm/

COPY . .
RUN npm run build:release


FROM nginx:1.25.1
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/home-nginx.conf etc/nginx/conf.d/home-nginx.conf
