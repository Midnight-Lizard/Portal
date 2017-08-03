FROM microsoft/aspnetcore-build:1.1
ARG source
WORKDIR /app
EXPOSE 80
COPY ${source:-obj/Docker/publish} .
ENTRYPOINT ["dotnet", "MidnightLizard.Web.Portal.dll"]
