<h1 align="center">
  SocialMap
</h1>

- [x] API Backend
- [x] Frontend Web
- [x] Frontend Mobile


<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./midias/logo6.png"/>
</h1>


<p align="center">
  <kbd>
    <img width="250" style="border-radius: 5px" height="450" src="./midias/mobile_exemple.gif" alt="Intro">
  </kbd>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <kbd>
    <img width="250" style="border-radius: 5px" height="450" src="./midias/mobile_exemple2.gif" alt="Register adopt">
  </kbd>
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

### Inicie o container do Backend
```shell
$ cd SocialMap-Backend
$ docker-compose build
$ docker-compose up
```
* OBS: Cuidado com os possíveis erros causados por nomes genéricos nos containers como 'mongodb'. Você pode precisar renomeá-los.

### Inicie o projeto Frontend
```shell
$ cd SocialMap-Frontend
$ npm install
$ npm start
```
* OBS: O projeto React usa a porta 3000 que é bem comum, caso haja algum programa rodando nessa porta você deve alterar um dos dois.
  
### Inicie o projeto Mobile
```shell
$ cd SocialMap-Mobile

```