buildNumber=${BUILD_NUMBER}

docker rmi -f localhost:5000/devopsly200-microservice1-teststage:$buildNumber
docker build -t localhost:5000/devopsly200-microservice1-teststage:$buildNumber ./DockerfileTest

docker rmi -f localhost:5000/devopsly200-microservice1-stagingstage:$buildNumber
docker build -t localhost:5000/devopsly200-microservice1-stagingstage:$buildNumber ./DockerfileStaging

docker rmi -f localhost:5000/devopsly200-microservice1-productionstage:$buildNumber
docker build -t localhost:5000/devopsly200-microservice1-productionstage:$buildNumber ./DockerfileProduction
