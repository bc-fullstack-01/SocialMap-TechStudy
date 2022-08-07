SocialMap API
=========

# fazer
- Ajeita o web socket



## Feactures
<ul>
<li>Autentificação com JWT e encriptografia de senha</li>
<li>Helmet - para proteção</li>
<li>Swagger - Criação da documentação</li>
<li>Morgan - Criação de Logs para cada iniciação do server</li>
<li>Websocket - Para alerta de notficações</li>
<li>RabbitMQ - Exchange para Notificações</li>
</ul>

# Mensageria
- Exchange do tipo 'direct' pra notificações
- Filas para cada tipo de notificação tratada
- A seguir um esquema do funcionamento:
<p align="center">
<img width="450" style="border-radius: 5px" height="400" src="./midias/rabbit.gif" alt="Intro">
</p>

# Requisitos
- Adicionar usuário do Sysmap com a descrição da empresa no inicio do feed

# Personalizações
- query no get post/:id para n pegar todos os seguidores de todo mundo que comentou
economizando no backend
- Post com midia e texto
- Usando a lib ampqlib para rabbitMQ
- Criando exchange e filas no código
- Adiconou o campo de posts no profile
- Usando o addToSet em vez do push para evitar duplicação de likes ou seguidores
```
{ $addToSet: { following: id_two }
```
- Populando apenas os campos desejados para economizar no tráfego de dados
```
.populate('profile', ['name', 'midia'])
.populate({ path: 'comments', populate: { path: 'profile', select: ['name' 'midia'] } })
```

        
# 🎲 Para Rodar o Back End

# Docker
* Entrar na pasta
```shell
$ cd SocialMap-Backend
```
* Buildar os containers
```shell
$ docker-compose build
```

* Iniciar os containers
```shell
$ docker-compose up
```

* Crie um database chamado 'main' no mongodb

