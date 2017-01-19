buildNumber=${BUILD_NUMBER}
sh run-tests-on-test.sh > run-tests-on-test.txt 

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
done < run-tests-on-test.txt 

if [ "$success" = "$no" ];
then
# rollback
	echo rolling-back
#	sh deploy-test-lastsuccess.sh
	sh deploy-test-failed.sh
	exit 1
fi

if [ "$success" = "$yes" ];
then
	docker rmi -f localhost:5000/devopsly200-microservice1-teststage-lastsuccess
	docker build -t localhost:5000/devopsly200-microservice1-teststage-lastsuccess -f DockerfileTest .
	docker push localhost:5000/devopsly200-microservice1-teststage-lastsuccess
	echo Tests-succeeded-updated-lastsuccess-image 
fi

