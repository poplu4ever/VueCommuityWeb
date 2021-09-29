# build stage
FROM node:10 as build-stage

LABEL maintainer=neo.lu4ever@gmail.com

WORKDIR /app

COPY . .

RUN yarn install

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]