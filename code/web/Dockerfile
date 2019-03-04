FROM node:10
RUN mkdir -p /user/src/app
WORKDIR /user/src/app
COPY ./package*.json ./
RUN npm install --quiet
COPY . ./
RUN npm run build:prod
EXPOSE 3001
ENTRYPOINT ["node", "build/index.js"]
