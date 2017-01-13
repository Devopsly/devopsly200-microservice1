buildNumber=${BUILD_NUMBER}

docker push localhost:5000/devopsly200-microservice1-teststage:$buildNumber
docker push localhost:5000/devopsly200-microservice1-teststage-failed:$buildNumber
docker push localhost:5000/devopsly200-microservice1-stagingstage:$buildNumber
docker push localhost:5000/devopsly200-microservice1-stagingstage-failed:$buildNumber
docker push localhost:5000/devopsly200-microservice1-productionstage:$buildNumber
docker push localhost:5000/devopsly200-microservice1-productionstage-failed:$buildNumber
