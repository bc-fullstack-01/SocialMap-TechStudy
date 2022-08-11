<!-- <h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./midias/logo6.png"/>
</h1>


- [x] API Backend
- [x] Frontend Web
- [x] Frontend Mobile




<p align="center">
  <kbd>
    <img width="250" style="border-radius: 5px" height="450" src="./midias/mobile_exemple.gif" alt="Intro">
  </kbd>
  <kbd>
    <img width="330" style="border-radius: 5px" height="450" src="./midias/profile_sysmap.png" alt="Register adopt">
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


# Rodar o projeto

### Clone o repositorio
```shell
$ git clone https://github.com/bc-fullstack-01/EdnoAlmeida-ProjetoFinal.git
$ cd EdnoAlmeida-ProjetoFinal
```

## Inicie o container do Backend
```shell
$ cd SocialMap-Backend
$ docker-compose build
$ docker-compose up
```
* OBS: Cuidado com os possíveis erros causados por nomes genéricos nos containers como 'mongodb'. Você pode precisar renomeá-los.

- No arquivo .env, mude o valor da variável HOTS para o host da sua rede
  
```js
HOST=SUA_REDE
```
- Para popular o banco de dados para fins de teste faça um get na rota a baixo, simplesmente colando esse endereço no navegador. Com o backend rodando é claro.
```sh
http://SUA_REDE:4000/v1/dev/seed
```

## Inicie o projeto Frontend
```shell
$ cd SocialMap-Frontend
$ npm install
$ npm start
```
- Mudar o valor no arquivo constante.ts para o host da sua internet
  
```js
const CONSTANTS = {
    API_HOST: 'http://SUA_REDE/v1',
    SOCKET_HOST: 'http://SUA_REDE/v1'
}
```

* OBS: O projeto React usa a porta 3000 que é bem comum, caso haja algum programa rodando nessa porta você deve alterar uma das duas.
  
## Inicie o projeto Mobile
```shell
$ cd SocialMap-Mobile
``` -->