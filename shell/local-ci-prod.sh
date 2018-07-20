#!/bin/sh
set -e
TAG=$(date +"%Y-%m-%d--%H-%M-%S")
PROJ=portal
REGISTRY=localhost:5000
IMAGE=$REGISTRY/$PROJ:$TAG
eval $(docker-machine env default --shell bash)
docker build -t $IMAGE \
    --build-arg BUILD_CMD="build:prod" \
    --build-arg RUN_CMD="start:ssr" \
    ../app
kubectl config use-context minikube
docker push $IMAGE
./helm-deploy.sh -i $IMAGE -r $PROJ -c ../kube/$PROJ \
    -s env.IDENTITY_URL=http://192.168.1.35:32006/ \
    -s env.PORTAL_URL=http://192.168.1.35:31067/ \
