FROM node:18.13-alpine as build

WORKDIR /app

COPY . /app/

RUN npm install --force
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx","-g","daemon off"]