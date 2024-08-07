FROM node:16 as builder
WORKDIR /app/hkca-esg-admin-web
COPY . .
RUN yarn install
RUN yarn build

FROM nginx:1.23.1
COPY --from=builder /app/hkca-esg-admin-web/build/ /usr/share/nginx/html
COPY .env /usr/share/nginx/html/
