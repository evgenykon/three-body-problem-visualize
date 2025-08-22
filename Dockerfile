FROM node:20

WORKDIR /app
COPY package*.json ./

RUN npm install -g bun

COPY ./app .



EXPOSE 3000

CMD ["bun", "index.ts"]