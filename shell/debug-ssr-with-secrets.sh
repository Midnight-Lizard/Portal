#!/bin/sh
set -e
cd "../app" ;

env "PORT=$PORT" "PORTAL_AUTH_SECRET=$(kubectl get secret portal-secret -o jsonpath={.data.auth-secret} | base64 -d)" npm run debug:ssr;

# kubectl get secret portal-secret -o json | jq '.data.\"auth-secret\"' | tr -d '\"' | base64 -d 2>nul