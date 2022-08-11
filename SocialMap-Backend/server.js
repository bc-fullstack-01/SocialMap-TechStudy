const setRabbit = require('./libs/setup')
const app = require('./app')

const server = require('http').Server(app)
const io = require("socket.io")(server, { cors: { origin: "*" } })

const Subscription = require("./middlewares/rabbitMiddwares");
const handleSocket = require('./middlewares/websocket');


// setup
setRabbit()


// Websocket
const liveData = io.of("/v1")
liveData.use(handleSocket.authenticationWebSocket)
liveData.on("connection", handleSocket.handleEvents)

// Consumer Rabbit to WebSocket
Subscription.receiveMsgAndAlertSocket(liveData.sockets, io);


// LINK TO SERVICES
const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'
ports = `
------------------- ROUTERS -----------------------------
Api in           = http://${HOST}:${PORT}
RabbitMQ in      = http://${HOST}:15672/
MongoDb in       = http://${HOST}:27017/
Storage FIles in = http://${HOST}:9001/login
Documentation in = http://${HOST}:${PORT}/api-docs
-------------------- LOGIN ------------------------------
Login = admin@gmail.com
Senha = admin123
---------------------------------------------------------

`

server.listen(PORT, () => console.log(ports));
