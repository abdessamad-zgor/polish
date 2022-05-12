docker stop $1
docker rm $1
docker rmi $1
docker build -t $1 .
docker run --name $1 -d -p $2:$2 $1
docker logs --details -ft $1
