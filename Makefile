kubectl apply -f k8s/back/mongo/mongo-service.yaml
kubectl apply -f k8s/back/mongo/mongo-statefulset.yaml

kubectl apply -f k8s/back/app/ngnix.yaml
kubectl apply -f k8s/back/app/ngnix-service.yaml

kubectl get deployments nginx-deployment
kubectl describe deployments nginx-deployment

# Para acessar os serviços no minikube use o comando:
minikube ip
minikube service service_name

#criar um secret
create secret generic user-cred --from-file=./senha.txt
create secret generic user-cred --from-lietal=username=edno--from-leteral=senha=sad12sa1
kubectl apply -f secret1.yaml

#obter o valor de um secret
kubectl get secret user-cred -o jsonpath=´{.data}´


#criando service por linha de comando
kubectl expose StatefulSet mongodb --type NodePort
#Criando imagens no dockerHub
docker build -f Dockerfile.dev -t edno28/socialfront-dev .
docker build -f Dockerfile.dev -t edno28/socialmap-backend .

docker push  edno28/socialmap-backend

docker run -it -p 4002:3000 edno28/socialfront-dev
docker run -it -p 4000:4000 edno28/socialmap-backend



#gerenciador de pacotes do kubernetes
helmet: 
	helm repo add bitnami https://charts.bitnami.com/bitnami
	helm install MY-RELEASE bitnami/kubeapps

