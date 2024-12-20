FROM node:19-alpine

ARG PORT_BACKEND
EXPOSE $PORT_BACKEND

WORKDIR /app

COPY nestjs/package*.json ./

RUN npm install

COPY nestjs/ ./

RUN npm install -g nodemon

CMD ["nodemon", "-L", "--watch", "src", "--exec", "ts-node", "src/main.ts"]

# FROM node:19-alpine AS builder
# WORKDIR /app
# COPY nestjs/package*.json ./
# RUN npm install
# COPY nestjs/ ./
# RUN npm run build

# FROM node:19-alpine
# ARG PORT
# EXPOSE $PORT
# WORKDIR /app
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/package*.json ./
# RUN npm install --production
# CMD ["node", "dist/main.js"]