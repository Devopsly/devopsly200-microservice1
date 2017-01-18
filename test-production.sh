buildNumber=${BUILD_NUMBER}
sh run-tests-on-production.sh > run-tests-on-production.txt 

searchString1="SUCCESS"
searchString2="SUCCESS"
success="no"
yes="yes"
no="no"
while read line
do
        name=$line
        if [ "$name" = "$searchString1" ] ;  
        then
		echo succeeded
                success="yes"
        fi
done < run-tests-on-production.txt 

if [ "$success" = "$no" ];
then
# rollback
	echo rolling-back
#sh deploy-production-lastsuccess.sh
	sh deploy-production-failed.sh
	exit 1
fi

if [ "$success" = "$yes" ];
then
	docker rmi -f localhost:5000/devopsly200-microservice1-productionstage-lastsuccess
	docker build -t localhost:5000/devopsly200-microservice1-productionstage-lastsuccess -f DockerfileProduction .
	docker push localhost:5000/devopsly200-microservice1-productionstage-lastsuccess
	echo Tests-succeeded-updated-lastsuccess-image 
fi

