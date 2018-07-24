FROM node:8
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run setup
RUN npm run build:prod
EXPOSE 3000
ENTRYPOINT ["node", "build/index.js"]
