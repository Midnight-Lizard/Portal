#===========================================#
#				ANGULAR	BUILD				#
#===========================================#
FROM microsoft/aspnetcore-build:2 as ng-build
COPY ./package.json /build/
WORKDIR /build
RUN npm install
ARG VENDOR_CONFIG=prod-build
RUN npm run --prefix ./node_modules/midnight-lizard-vendor ${VENDOR_CONFIG}
COPY ./ClientApp ./ClientApp
COPY ./tsconfig.json .
COPY ./webpack.config.js .
ARG WEBPACK_CONFIG="--env.prod -p"
RUN node ./node_modules/webpack/bin/webpack.js ${WEBPACK_CONFIG}

#===========================================#
#				ANGULAR	TEST				#
#===========================================#
FROM microsoft/aspnetcore-build:2 as ng-test
RUN apt-get update
RUN apt-get install -y gconf-service libasound2 libatk1.0-0 libcairo2 libcups2 libdbus-1-3 libfontconfig1 libgconf-2-4 libgdk-pixbuf2.0-0
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install
COPY --from="ng-build" /build /test
WORKDIR /test
RUN npm run ci-test

#===========================================#
#				DOTNET	BUILD				#
#===========================================#
FROM microsoft/aspnetcore-build:2 as dotnet-build
COPY *.csproj /build/
WORKDIR /build
RUN dotnet restore
COPY . .
COPY --from="ng-build" /build .
ARG DOTNET_CONFIG=Release
RUN dotnet publish -c ${DOTNET_CONFIG} -o ./results

#===========================================#
#				IMAGE	BUILD				#
#===========================================#
FROM microsoft/aspnetcore:2 as image
RUN apt-get update
RUN apt-get install -y gnupg gnupg2 gnupg1
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
WORKDIR /app
EXPOSE 80
COPY --from="dotnet-build" /build/results .
ENTRYPOINT ["dotnet", "MidnightLizard.Web.Portal.dll"]
