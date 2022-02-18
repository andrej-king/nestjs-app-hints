# By class lesson

FROM node:17.4.0-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install --force
ADD . .

RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]
