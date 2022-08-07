const jwt = require("jsonwebtoken")
const { User } = require("../models")


const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "thisismytoke"

function authenticationWebSocket(socket, next) {
    if (socket.handshake.auth) {
        const token = socket.handshake.auth.token
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) next(new Error("Authentication error"))
            User.findOne({'user': decoded.user})
                .then(user => {
                    socket.profile = user.profile
                    next()
                })
                .catch(() => next(new Error("User not found!")))
        })
    } else {
        next(new Error("Authentication error"))
    }
}

function handleEvents(socket) {
    socket.on("error", err => {
        console.log(`error - ${err}`)
    })

    socket.emit("connect_profile", socket.id)
}

module.exports = {
    authenticationWebSocket,
    handleEvents,
}

