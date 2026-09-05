FROM node:20-alpine AS build
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1
WORKDIR /opt/
COPY package*.json ./
RUN npm ci
WORKDIR /opt/app
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:20-alpine
RUN apk add --no-cache vips-dev
WORKDIR /opt/
COPY package*.json ./
RUN npm ci --only=production
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH=/opt/node_modules/.bin:$PATH
ENV NODE_ENV=production

EXPOSE 1337
CMD ["npm", "run", "start"]