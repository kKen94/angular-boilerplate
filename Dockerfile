#STAGE 1: build the angular application
FROM node:12.18.0-alpine as builder
ARG APP_ENV
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn run build:$APP_ENV

#STAGE 2: create a docker image for deployment

FROM nginx:alpine

## Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/frontend/ /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf
