
siteIp=$(curl http://myip.dnsomatic.com)

if curl -s --head  --request GET http://${siteIp}:31450/greetuser | grep "greeting" > /dev/null; then 
   echo "SUCCESS"
   
else
   echo "FAILURE"
fi

