
siteIp=$(curl http://myip.dnsomatic.com)

if curl -s --head  --request GET http://${siteIp}:31400 | grep "200 OK" > /dev/null; then 
   echo "SUCCESS"
   
else
   echo "FAILURE"
fi

