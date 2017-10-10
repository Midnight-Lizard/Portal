echo "kube apply"
kubectl config set-context minikube
$f = "./";
kubectl apply -f $f
