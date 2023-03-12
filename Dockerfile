FROM node:14.18.2 as dependencies
WORKDIR /project
COPY package.json yarn.lock .husky ./
RUN yarn install --no-cache --frozen-lockfile --ignore-scripts --production=false

FROM node:14.18.2 as builder
WORKDIR /project
COPY . .
COPY --from=dependencies /project/node_modules ./node_modules
RUN yarn build

FROM node:14.18.2 as runner
WORKDIR /project
ENV NODE_ENV ${NODE_ENV}

COPY --from=builder /project/next.config.js ./
COPY --from=builder /project/public ./public
COPY --from=builder /project/.next ./.next
COPY --from=builder /project/node_modules ./node_modules
COPY --from=builder /project/package.json ./package.json

EXPOSE 80
CMD ["yarn", "start"]
