FROM keymetrics/pm2:10-alpine

ENV APP="/srv/www/app"
ARG PORT=8000

# create app directory
RUN mkdir -p $APP \
    && getent group web || addgroup -g 1200 web \
    && getent passwd web || adduser -u 1200 -G web -s /bin/sh -D -h ${APP} web \
    && apk add --no-cache curl

# change directory to $APP
WORKDIR $APP

# copy source code to $APP
COPY . $APP

# install dependencies
RUN yarn \
    && yarn global add sequelize-cli \
    && yarn cache clean

RUN chown -R web:web ${APP} && chmod 755 ${APP}

USER web

EXPOSE $PORT

CMD [ "yarn", "dev" ]
