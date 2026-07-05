# CREATE_IMAGE_01: Create "base" image with Node.js and pnpm installed
FROM node:20.18 AS base
ENV CI=true

RUN npm i -g pnpm

# CREATE_IMAGE_02: Create a "dependencies" image with dependencies installed
FROM base AS dependencies

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

# CREATE_IMAGE_03: Create a "build" image with the app built
FROM base AS build

WORKDIR /usr/src/app

COPY . .
# INFO_01: I need to copy the node_modules from the dependencies image to the build image, so that I can run the build command without having to install the dependencies again.
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

RUN pnpm build
RUN pnpm prune --prod

# CREATE_IMAGE_04: Create a "production_deployment" image with the app ready to run
FROM cgr.dev/chainguard/node:latest AS production_deployment

USER 1000

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

EXPOSE 3333

CMD ["dist/server.mjs"]