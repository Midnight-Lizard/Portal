param(
    # the selector from your yml file
    #  selector:
    #    matchLabels:
    #      app: myweb
    # -Selector app=myweb
    [Parameter(Mandatory=$true)][string]$Selector
)

Write-Host '1. searching pod by selector:' $Selector;
$pod = kubectl get pods --selector=$Selector -o jsonpath='{.items[0].metadata.name}';

Write-Host '2. installing unzip ...';
kubectl exec $pod -i -- apt-get install unzip;

Write-Host '3. downloading getvsdbgsh ...';
kubectl exec $pod -i -- curl -sSL https://aka.ms/getvsdbgsh -o '/root/getvsdbg.sh';

Write-Host '4. installing vsdbg...';
kubectl exec $pod -i -- bash /root/getvsdbg.sh -v latest -l /vsdbg;

$cmd = 'dotnet';
Write-Host '5. seaching for' $cmd 'process PID in pod:' $pod '...';
$prid = kubectl exec $pod -i -- pidof -s $cmd;

Write-Host '6. attaching debugger to process with PID:' $pid 'in pod:' $pod '...';
kubectl exec $pod -i -- /vsdbg/vsdbg --interpreter=mi --attach $prid;