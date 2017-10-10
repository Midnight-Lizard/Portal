echo "tagging image..."
$ver = "1";
$image = "portal";
$registry = "localhost:5000";
$tag = $registry + "/" + $image + ":" + $ver;
docker tag $image $tag;
docker push $tag;