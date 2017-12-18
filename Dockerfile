FROM keymetrics/pm2-docker-alpine:7

ENV APP="/usr/web/home/app"
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
    && yarn cache clean

USER web

# health check
HEALTHCHECK --timeout=20s --retries=5 \
    CMD curl -fs localhost:${PORT} || exit 1

EXPOSE $PORT

CMD [ "yarn", "dev" ]
