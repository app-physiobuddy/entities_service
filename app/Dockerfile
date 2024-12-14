FROM node:lts-slim
# needs for prisma:
RUN apt-get update -y && apt-get install -y openssl 
WORKDIR /app


COPY package*.json ./
COPY tsconfig.json ./

COPY . .

RUN npm install
RUN npm run build

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

RUN npm run build

EXPOSE ${APP_PORT}

CMD ["npm", "start"]

