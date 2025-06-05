FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --production

FROM nginx:alpine
COPY --from=build /app/dist/subtitle-file-cleaner-client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
