FROM microsoft/aspnetcore:2
RUN apt-get update
RUN apt-get install -y gnupg gnupg2 gnupg1
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
ARG source
WORKDIR /app
EXPOSE 80
COPY ${source:-obj/Docker/publish} .
ENTRYPOINT ["dotnet", "MidnightLizard.Web.Portal.dll"]
