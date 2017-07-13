FROM node:7.6.0-alpine

ENV APP="/usr/www/app"
ARG PORT=8000

# create app directory
RUN mkdir -p $APP

# change directory to /usr/www/app
WORKDIR $APP

# copy source code to /usr/www/app
COPY . $APP

# install dependencies
RUN yarn \
    && yarn cache clean

EXPOSE $PORT

CMD [ "npm", "run", "dev" ]


 
