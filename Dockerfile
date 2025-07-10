FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine
RUN apk add --no-cache curl

WORKDIR /app
COPY --from=build /app/.output ./.output
COPY --from=build /app/package*.json ./

RUN npm install --production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]