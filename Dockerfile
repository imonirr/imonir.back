# create image based on official node 6 image from Docker
FROM node:8

# set environment
ENV NPM_CONFIG_LOGLEVEL warn
# ARG env
# ENV NOTE_ENV $env
ENV APP=/home/app

#copy dependency lock files
COPY ./package.json $APP/package.json
COPY ./yarn.lock $APP/yarn.lock

# move to app dir
WORKDIR $APP

# install dependencies for app
RUN yarn install


# run app
CMD [ -f "/bin/bash" ] && if [ ${NODE_ENV} = production ]; \
  then \
  yarn build; \
  else \
  yarn install; yarn start; \
  fi


