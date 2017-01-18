buildNumber=${BUILD_NUMBER}
sh run-tests-on-staging.sh > run-tests-on-staging.txt 

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
done < run-tests-on-staging.txt 

if [ "$success" = "$no" ];
then
# rollback
	echo rolling-back
#	sh deploy-staging-lastsuccess.sh
	sh deploy-staging-failed.sh
	exit 1
fi

if [ "$success" = "$yes" ];
then
	docker rmi -f localhost:5000/devopsly200-microservice1-stagingstage-lastsuccess
	docker build -t localhost:5000/devopsly200-microservice1-stagingstage-lastsuccess -f DockerfileStaging .
	docker push localhost:5000/devopsly200-microservice1-stagingstage-lastsuccess
	echo Tests-succeeded-updated-lastsuccess-image 
fi

