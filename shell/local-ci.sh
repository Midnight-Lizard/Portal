#!/bin/sh
set -e
TAG=4
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
./helm-deploy.sh -i $IMAGE -r $PROJ -c ../kube/$PROJ -s ingress.enabled=false
