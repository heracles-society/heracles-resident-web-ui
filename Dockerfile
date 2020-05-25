FROM node:12.16.3-alpine3.9 as base

FROM base as builder

# Build stage
ARG HERACLES_API=http://localhost:3200
ENV REACT_APP_HERACLES_API=${HERACLES_API}

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

ARG UI_PORT=80
EXPOSE ${UI_PORT}
RUN npm install -g serve
CMD ["serve", "/app/build", "-l", "0.0.0.0:${UI_PORT}}"]

