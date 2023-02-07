FROM node:18.13-alpine as builder

WORKDIR /app
COPY package.json .

RUN npm install --force
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g","daemon off;"]
# Test 3
