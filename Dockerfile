FROM node:20.17.0 AS builder

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn run build

FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]