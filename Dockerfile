FROM node:18-slim as BUILDER

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .
RUN npm run build

FROM node

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/tsconfig.build.json ./
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD [ "node", "dist/main" ]
