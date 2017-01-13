buildNumber=${BUILD_NUMBER}

docker rmi -f localhost:5000/devopsly200-microservice1-teststage:$buildNumber
docker build -t localhost:5000/devopsly200-microservice1-teststage:$buildNumber -f DockerfileTest .

docker rmi -f localhost:5000/devopsly200-microservice1-teststage-failed:$buildNumber
docker build -t localhost:5000/devopsly200-microservice1-teststage-failed:$buildNumber -f DockerfileTest .

docker rmi -f localhost:5000/devopsly200-microservice1-stagingstage:$buildNumber
docker build -t localhost:5000/devopsly200-microservice1-stagingstage:$buildNumber -f DockerfileStaging .

docker rmi -f localhost:5000/devopsly200-microservice1-stagingstage-failed:$buildNumber
docker build -t localhost:5000/devopsly200-microservice1-stagingstage-failed:$buildNumber -f DockerfileStaging .

docker rmi -f localhost:5000/devopsly200-microservice1-productionstage:$buildNumber
docker build -t localhost:5000/devopsly200-microservice1-productionstage:$buildNumber -f DockerfileProduction .

docker rmi -f localhost:5000/devopsly200-microservice1-productionstage-failed:$buildNumber
docker build -t localhost:5000/devopsly200-microservice1-productionstage-failed:$buildNumber -f DockerfileProduction .
