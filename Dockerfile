ARG NODE_VERSION=24.14.0

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

# deps
FROM base as deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# build
FROM base as build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# final
FROM base as final

ENV NODE_ENV=production
USER node

COPY package.json ./

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY doc ./doc

EXPOSE 4000

CMD ["node", "dist/main.js"]