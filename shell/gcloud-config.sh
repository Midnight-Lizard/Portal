#!/bin/sh
set -e

while [ "$1" != "" ]; do
    case $1 in
        -k | --key)
            GCE_KEY=$2
            ;;
        -z | --zone)
            GCE_CLUSTER_ZONE=$2
            ;;
        -c | --cluster)
            GCE_CLUSTER_NAME=$2
            ;;
        -p | --project)
            PROJECT=$2
            ;;
        *)
            echo "ERROR: unknown parameter \"$1\""
            exit 1
            ;;
    esac
    shift 2
done

echo "activating GCE cluster..."
echo "$GCE_KEY" > key.txt;
base64 -i key.txt -d > key.json
gcloud auth activate-service-account --key-file key.json;
gcloud config set compute/zone $GCE_CLUSTER_ZONE;
gcloud config set project $PROJECT;
gcloud container clusters get-credentials $GCE_CLUSTER_NAME;