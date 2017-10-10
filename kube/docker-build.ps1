echo "set docker-machine"
docker-machine env default | Invoke-Expression
echo "active docker-machine:"
docker-machine active

echo "docker-compose is running..."
docker-compose -f "../docker-compose-local/docker-compose.yml" build --force-rm