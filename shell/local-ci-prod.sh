#!/bin/sh
set -e
TAG=$(date +"%Y-%m-%d--%H-%M-%S")
PROJ=portal
REGISTRY=localhost:5000
IMAGE=$REGISTRY/$PROJ:$TAG
eval $(docker-machine env default --shell bash)
docker build -t $IMAGE \
    --build-arg BUILD_LIBS_CMD="build:prod:libs" \
    --build-arg BUILD_CMD="build:prod" \
    --build-arg RUN_CMD="start:ssr" \
    ../app
# docker push $IMAGE
# kubectl config use-context minikube
# secret=$(echo -n not-a-secret | base64 -w 0);
# helm upgrade --install --set image=$IMAGE \
#     --set env.IDENTITY_URL=http://192.168.1.44:32006/ \
#     --set env.PORTAL_URL=http://192.168.1.44:31565/ \
#     --set env.SCHEMES_QUERIER_URL=http://192.168.1.44:31005/ \
#     --set env.PORTAL_AUTH_REFRESH_INTERVAL=240000 \
#     --set secrets.sessionSecret=$secret \
#     $PROJ -c ../kube/$PROJ
