FROM node:14.15.1-alpine

WORKDIR /usr/src/app

ENV ENV_NODE=production

# ENV URL_MONGO='mongodb+srv://users:nH}DaipF0Cgw1SB)v@cluster0.7ok9z.mongodb.net/service-users?retryWrites=true&w=majority'

# ENV URL_PORT_API=3000

# ENV FACEBOOK_APP_ID='150670660180166'
# ENV FACEBOOK_APP_SECRET='ae1f223e9478da1dd1cfa186509c1a52'
# ENV FACEBOOK_URL_CALLBACK='http://localhost:'$URL_PORT_API'/facebook/callback'

COPY package.json .
COPY package-lock.json .
COPY src/ ./src

COPY envs.sh .
COPY tsconfig.json .

EXPOSE 3001

RUN npm install

RUN source envs.sh

CMD ["npm", "start"]

