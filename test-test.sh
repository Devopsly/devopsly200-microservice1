buildNumber=${BUILD_NUMBER}
sh run-test.sh > unit-test-output.txt 

searchString1="SUCCESS"
searchString2="SUCCESS"
success="no"
yes="yes"
no="no"
while read line
do
        name=$line
        if [[ $name == *"$searchString1"* ]] ||
         [[ $name == *"$searchString2"* ]]
        then
                success="yes";
        fi
done < unit-test-output.txt

if [[ $success == *"$no"* ]]
then
# rollback
        docker rmi -f localhost:5000/devopsly200-microservice1:$buildNumber
	sh deploy-test.sh
fi

