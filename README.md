SocialMap Full
=========
- [x] API Backend
- [x] Frontend Web
- [x] Frontend Mobile


<h1 align="center">
  <img alt="NextLevelWeek" title="#NextLevelWeek" src="./midias/logo6.png"/>
</h1>


<p align="center"> 
  <a href="https://discord.gg/BHHz77rhb6">
    <img src="https://img.shields.io/discord/829042103295410197?color=%237289DA&label=Animavita&logo=discord&logoColor=white" alt="Discord">
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/progress-40%25-brightgreen.svg" alt="PRs Welcome">
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/contribuition-welcome-brightgreen.svg" alt="PRs Welcome">
  </a>
  <a href="https://saythanks.io/to/wendelfreitas">
      <img src="https://img.shields.io/badge/SayThanks.io-%E2%98%BC-1EAEDB.svg">
  </a>
<a href="https://www.repostatus.org/#wip"><img src="https://www.repostatus.org/badges/latest/wip.svg" alt="Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public." /></a>  
</p>

<p align="center">
  <kbd>
    <img width="250" style="border-radius: 5px" height="450" src="./midias/mobile_exemple.gif" alt="Intro">
  </kbd>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <kbd>
    <img width="250" style="border-radius: 5px" height="450" src="https://i.imgur.com/jxUIe8w.gif" alt="Register adopt">
  </kbd>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <kbd>
    <img width="250" style="border-radius: 5px" height="450" src="https://i.imgur.com/CNczcSk.gif" alt="Chat">
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