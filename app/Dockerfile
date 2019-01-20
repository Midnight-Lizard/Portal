#===========================================#
#							ANGULAR	BUILD									#
#===========================================#
FROM node:10-alpine as ng-build
WORKDIR /build
COPY ./package.json .
RUN npm install
COPY ./*.json ./
COPY ./projects ./projects
ARG BUILD_LIBS_CMD="build:prod:libs"
RUN npm run ${BUILD_LIBS_CMD}
COPY ./*.* ./
COPY ./src ./src
ARG BUILD_CMD="build:prod"
RUN npm run ${BUILD_CMD}

#===========================================#
#							ANGULAR	TEST									#
#===========================================#
FROM node:10-slim as ng-test
RUN apt-get update && apt-get install -y wget --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get purge --auto-remove -y curl \
    && rm -rf /src/*.deb
WORKDIR /test
COPY ./package.json .
COPY --from=ng-build /build/node_modules ./node_modules
RUN npm i node-sass
COPY ./*.json ./
COPY ./src/*.json ./src/
COPY ./projects ./projects
RUN npm run test:ci:libs
COPY . .
RUN npm run test:ci
COPY --from=ng-build /build/dist ./dist
COPY ./e2e ./e2e
RUN npm run e2e:ci

#===========================================#
#								SSR IMAGE										#
#===========================================#
FROM node:10-alpine as ssr-image
WORKDIR /app
EXPOSE 80
EXPOSE 9229
COPY ./package.json .
COPY --from=ng-build /build/dist/*.* ./dist/
COPY --from=ng-build /build/dist/portal-browser ./dist/portal-browser
COPY --from=ng-build /build/dist/portal-server ./dist/portal-server
ARG RUN_CMD="start:ssr"
ENV RUN_CMD ${RUN_CMD}
ENTRYPOINT npm run ${RUN_CMD}
