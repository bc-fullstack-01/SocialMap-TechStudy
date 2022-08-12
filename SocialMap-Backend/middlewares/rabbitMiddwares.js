const RabbitmqServer = require("../libs/handlerRabbitmq");
const { Post } = require("../models");

async function addPublishInReq(req, res, next) {
    try {
        const server = new RabbitmqServer();
        await server.start();
        req.publish = async (exchange, keys, value, headers = {}) => {
            await server.publishInExchange(exchange, keys, JSON.stringify(value), headers);
        }
        next()
    } catch (err) {
        next(err)
    }
}


async function receiveMsgAndAlertSocket(socketsOn, io) {
    try {
        var rabit_server = new RabbitmqServer()
        await rabit_server.start()

        rabit_server.consume('post-new', (message) => {
            socketsOn = Object.entries(Object.fromEntries(socketsOn))
            socketsOn.filter(([, socket]) => message.properties.headers.id.includes(socket.profile.toString()))
                .map(([k, s]) => s.emit('post-new', JSON.parse(message.content)))
        })
        rabit_server.consume('post-like', (message) => {
            socketsOn = Object.entries(Object.fromEntries(socketsOn))
            socketsOn.filter(([, socket]) => message.properties.headers.id.includes(socket.profile.toString()))
                .map(([k, s]) => s.emit('post-like', JSON.parse(message.content)))
        })
        rabit_server.consume('comment-new', (message) => {
            socketsOn = Object.entries(Object.fromEntries(socketsOn))
            // console.log('--------------------------------------------')
            // console.log(io.of("/v1").engine.clientsCount)        
            // console.log(io.engine.clientsCount)        
            for (c of socketsOn) {
                console.log(c[0], c[1].profile.toString())
            }
            socketsOn.filter(([, socket]) => message.properties.headers.id.includes(socket.profile.toString()))
                .map(([k, s]) => { return s.emit('comment-new', JSON.parse(message.content)) })
        })
        rabit_server.consume('follow-new', (message) => {
            socketsOn = Object.entries(Object.fromEntries(socketsOn))
            socketsOn.filter(([, socket]) => message.properties.headers.id.includes(socket.profile.toString()))
                .map(([k, s]) => s.emit('follow-new', JSON.parse(message.content)))
        })


    } catch (err) {
        console.log('Erro no consumo da file rabbit', err)
    }
}


//feacture future: salve datas using event
async function receiveMsgAndSaveData() {
    try {
        var rabit_server = new RabbitmqServer()
        await rabit_server.start()
        await rabit_server.consume('save-data', (message) => {
            //implementação
        })
    } catch (err) {
        console.log('Erro', err)
    }
}

module.exports = {
    receiveMsgAndAlertSocket,
    receiveMsgAndSaveData,
    addPublishInReq
}
