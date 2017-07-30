FROM node:8.2.1-alpine
ADD . /code
WORKDIR /code
EXPOSE 3000
RUN npm install
CMD ["node", "app.js"]
