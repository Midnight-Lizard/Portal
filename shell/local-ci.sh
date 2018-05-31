#!/bin/sh
set -e
TAG=$(date +"%Y-%m-%d--%H-%M-%S")
PROJ=portal
REGISTRY=localhost:5000
IMAGE=$REGISTRY/$PROJ:$TAG
eval $(docker-machine env default --shell bash)
docker build -t $IMAGE \
    --build-arg DOTNET_CONFIG=Build \
    --build-arg VENDOR_CONFIG=dev-build \
    --build-arg WEBPACK_CONFIG="" \
    ../app
kubectl config set-context minikube
docker push $IMAGE
./helm-deploy.sh -i $IMAGE -r $PROJ -c ../kube/$PROJ \
    -s env.ASPNETCORE_ENVIRONMENT=Development \
    -s env.IDENTITY_URL=http://192.168.1.44:32326/

