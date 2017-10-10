#===========================================#
#				PROJECT	BUILD				#
#===========================================#
FROM microsoft/aspnetcore-build:2 as proj-build

COPY ./package.json /build/
WORKDIR /build
RUN npm install
RUN npm run --prefix ./node_modules/midnight-lizard-vendor prod-build

COPY ./ClientApp /build/ClientApp
COPY ./tsconfig.json /build/
COPY ./webpack.config.js /build/
RUN node ./node_modules/webpack/bin/webpack.js --env.prod -p

COPY . /build
RUN dotnet restore
RUN dotnet publish -c Release -o ./results

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
COPY --from="proj-build" /build/results .
ENTRYPOINT ["dotnet", "MidnightLizard.Web.Portal.dll"]
