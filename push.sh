buildNumber=${BUILD_NUMBER}

docker push localhost:5000/devopsly200-microservice1-teststage
docker push localhost:5000/devopsly200-microservice1-teststage-failed
docker push localhost:5000/devopsly200-microservice1-stagingstage
docker push localhost:5000/devopsly200-microservice1-stagingstage-failed
docker push localhost:5000/devopsly200-microservice1-productionstage
docker push localhost:5000/devopsly200-microservice1-productionstage-failed
