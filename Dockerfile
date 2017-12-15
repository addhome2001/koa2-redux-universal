FROM node:7.6.0-alpine

ENV APP="/usr/www/app"
ARG PORT=8000

RUN addgroup -g 1200 f2e \
    && adduser -u 1200 -G f2e -D f2e \
    && apk add --no-cache curl \
    # create app directory
    && mkdir -p $APP

# change directory to /usr/www/app
WORKDIR $APP

# copy source code to /usr/www/app
COPY . $APP

# install dependencies
RUN yarn \
    && yarn cache clean

# health check
HEALTHCHECK --timeout=20s --retries=5 \
    CMD curl -fs localhost:${PORT} || exit 1

EXPOSE $PORT

CMD [ "npm", "run", "dev" ]



