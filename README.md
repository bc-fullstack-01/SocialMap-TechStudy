<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./midias/logo6.png"/>
</h1>


- [x] API Backend (Faltam alguns ajustes)
- [x] Frontend Web
- [x] Frontend Mobile (Em desenvolvimento)

## Versão WEB (100% responsiva)

<p align="center">
  <kbd>
    <img width="250" style="border-radius: 5px" height="450" src="./midias/mobile_exemple.gif" alt="Intro">
  </kbd>
  <kbd>
    <img width="250" style="border-radius: 5px" height="450" src="./midias/profile_sysmap.png" alt="Register adopt">
  </kbd>
  <kbd>
    <img width="250" style="border-radius: 5px" height="450" src="./midias/mobile_exemple2.gif" alt="Register adopt">
  </kbd>
    &nbsp;&nbsp;&nbsp;&nbsp;

</p>
<p align="center">
<kbd>
  <img width="650" style="border-radius: 5px" height="400" src="./midias/web-exemple.gif" alt="Chat">
</kbd>
</p>

## Versão Mobile
<p align="center">
  <kbd>
    <img width="250" style="border-radius: 5px" height="480" src="./midias/app4.jpeg" alt="Intro">
  </kbd>
  <kbd>
    <img width="250" style="border-radius: 5px" height="480" src="./midias/app2.jpeg" alt="Register adopt">
  </kbd>
  <kbd>
    <img width="250" style="border-radius: 5px" height="480" src="./midias/app5.jpeg" alt="Register adopt">
  </kbd>
    &nbsp;&nbsp;&nbsp;&nbsp;

</p>


# Rodar o projeto

### Clone o repositorio
```shell
$ git clone https://github.com/bc-fullstack-01/EdnoAlmeida-ProjetoFinal.git
$ cd EdnoAlmeida-ProjetoFinal
```

## Iniciar o Backend

```shell
$ cd SocialMap-Backend
```

- No arquivo .env, mude o valor da variável HOTS para o host da sua rede

```js
HOST=SUA_REDE
```


### Inicie o container do Backend
* OBS: Cuidado com os possíveis erros causados por nomes genéricos nos containers como 'mongodb'. Você pode precisar renomeá-los.
```shell
$ docker-compose build
$ docker-compose up
```



- No arquivo app.js pode ser necessário comentar a linha que invoca o middlware helmet.
```js
// Middlewares
app.use(cors())
//app.use(helmet());
```

- Para popular o banco de dados para fins de teste faça um get na rota a baixo, simplesmente colando esse endereço no navegador. Com o backend rodando é claro.
```sh
http://localhost:4000/v1/dev/seed
```

## Inicie o projeto Frontend
```shell
$ cd SocialMap-Frontend
$ npm install
```

### Mudar o valor no arquivo constante.ts para o host da sua internet
  * OBS: O projeto React usa a porta 3000 que é bem comum, caso haja algum programa rodando nessa porta você deve alterar uma das duas.
  
```js
const CONSTANTS = {
    API_HOST: 'http://SUA_REDE:4000/v1',
    SOCKET_HOST: 'http://SUA_REDE:4000/v1'
}
```

```shell
$ npm start
```

## Inicie o projeto Mobile (Em desenvolvimento)
```shell
$ cd SocialMap-Mobile
$ npm install
```

### Mudar o valor no arquivo constante.ts para o host da sua internet  
```js
const CONSTANTS = {
    API_HOST: 'http://SUA_REDE:4000/v1',
    SOCKET_HOST: 'http://SUA_REDE:4000/v1'
}
```
### Rodar o projeto
```shell
$ npm start
```
