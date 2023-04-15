FROM node:16.16.0
WORKDIR /project
COPY . .
RUN yarn install --no-cache --frozen-lockfile --ignore-scripts
RUN yarn build
