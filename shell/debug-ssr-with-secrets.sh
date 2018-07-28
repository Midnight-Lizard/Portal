#!/bin/sh
set -e
cd "../app" ;

env "PORT=$PORT" "IDENTITY_PORTAL_CLIENT_SECRET=$(kubectl get secret identity-portal-secret -o jsonpath={.data.clientSecret} | base64 -d)" npm run debug:ssr;

# kubectl get secret portal-secret -o json | jq '.data.\"auth-secret\"' | tr -d '\"' | base64 -d 2>nul