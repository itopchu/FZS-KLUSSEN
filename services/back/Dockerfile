FROM node:19-alpine

ARG PORT_BACKEND
EXPOSE $PORT_BACKEND

WORKDIR /app

COPY nestjs/package*.json ./

RUN npm install

COPY nestjs/ ./

RUN npm install -g nodemon

CMD ["nodemon", "-L", "--watch", "src", "--exec", "ts-node", "src/main.ts"]