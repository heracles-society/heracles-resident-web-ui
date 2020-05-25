FROM node:12.16.3-alpine3.9 as base

FROM base as builder

# Build stage
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN yarn run build

# Serve App stage
FROM base as app
WORKDIR /app

COPY --from=builder /app/build /app/build

RUN yarn global add serve
