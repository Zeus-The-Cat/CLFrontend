FROM node:12

WORKDIR /frontend

COPY package.json ./
COPY  /build ./

RUN ["npm", "install", "serve"]

EXPOSE 8080

CMD ["npm","run","serveApp"]
