<h1 align="center">
  SocialMap Frontend
</h1>


## Versão WEB (100% responsiva)

<p align="center">
  <kbd>
    <img width="250" style="border-radius: 5px" height="430" src="../midias/mobile_exemple.gif" alt="Intro">
  </kbd>
  <kbd>
    <img width="270" style="border-radius: 5px" height="430" src="../midias/profile_sysmap.png" alt="Register adopt">
  </kbd>
  <kbd>
    <img width="250" style="border-radius: 5px" height="430" src="../midias/mobile_exemple2.gif" alt="Register adopt">
  </kbd>
    &nbsp;&nbsp;&nbsp;&nbsp;

</p>
<p align="center">
<kbd>
  <img width="650" style="border-radius: 5px" height="400" src="../midias/web-exemple.gif" alt="Chat">
</kbd>
</p>

# Rodar o projeto
* Com o container do backend já rodando execute os códigos abaixo

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