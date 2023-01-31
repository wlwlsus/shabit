FROM node:18.13-alpine as builder

WORKDIR /app
COPY package.json .

RUN npm install --force
COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html


# FROM node:18.13-alpine as build

# WORKDIR /app
# COPY . /app/

# RUN npm install --force
# RUN npm install --slient
# RUN npm install react-scripts@3.0.1 -g --slient

# RUN npm run build

# FROM nginx:stable-alpine as production-stage
# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=build /app/build /usr/share/nginx/html
# # RUN rm /etc/nginx/conf.d/default.conf

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


