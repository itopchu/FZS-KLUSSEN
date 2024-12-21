# FROM node:19-alpine

# ARG PORT

# EXPOSE $PORT

# WORKDIR /app

# COPY vite-react-ts/package*.json ./

# RUN npm install

# COPY vite-react-ts/ ./

# RUN npm run build

# CMD ["npm", "run", "dev"]

FROM node:19-alpine

ARG PORT_FRONTEND
EXPOSE ${PORT_FRONTEND}

WORKDIR /app

COPY vite-react-ts/package*.json ./

RUN npm ci

RUN npm install -g serve typescript

COPY vite-react-ts/ ./

RUN chmod +x /app/start.sh

CMD ["sh", "/app/start.sh"]