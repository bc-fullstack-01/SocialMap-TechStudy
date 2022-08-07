const setRabbit = require('./libs/setup')
const app = require('./app')

const server = require('http').Server(app)
const io = require("socket.io")(server, { cors: { origin: "*" } })

const Subscription = require("./middlewares/rabbitMiddwares");
const handleSocket = require('./middlewares/websocket');


// setup
setRabbit()

// variables
const PORT = process.env.PORT || 3000

// Websocket
const liveData = io.of("/v1")
liveData.use(handleSocket.authenticationWebSocket)
liveData.on("connection", handleSocket.handleEvents)

// Consumer Rabbit to WebSocket
Subscription.receiveMsgAndAlertSocket(liveData.sockets, io);


ports = `
------------------- ROUTERS -----------------------------
Api in           = http://0.0.0.0:${PORT}
RabbitMQ in      = http://0.0.0.0:15672/
MongoDb in       = http://0.0.0.0:27017/
Storage FIles in = http://0.0.0.0:9001/login
Documentation in = http://0.0.0.0:${PORT}/api-docs
-------------------- LOGIN ------------------------------
Login = admin@gmail.com
Senha = admin123
---------------------------------------------------------

`

server.listen(PORT, () => console.log(ports));
