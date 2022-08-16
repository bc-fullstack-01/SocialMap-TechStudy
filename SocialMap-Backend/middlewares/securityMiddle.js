const createError = require('http-errors');
const jwt = require('jsonwebtoken')
const logger = require("log4js").getLogger("aplication");

const { Connection, User } = require('../models');


const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "thisismytoken"


const mongoConnection = (req, res, next) => {
    Connection
        .then(() => next())
        .catch(err => next(err))
}


function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return next(createError(401))
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return next(createError(403))
        User.findOne({'user': decoded.user}).populate("profile")
            .then(user => {
                req.user = user
                next()
            })
            .catch(err => next(err))
    })
}


function endPointError(err, req, res, next) {
    if (err.name && err.name === "ValidationError") {
        res.status(406).json(err)
    }
    else if ((err.status === 404) || (err.name === "CastError")) {
        res.status(404).json({
            url: req.originalUrl,
            error: { message: 'Not found' }
        })
    } else if ((err.status === 11000) || (err.name === "CastError")) {
        res.status(404).json({
            url: req.originalUrl,
            error: { message: 'Duplicate key not allowed' }
        })
    } else {
        logger.error(err);
        res.status(err.status || 500).json({
            url: req.originalUrl,
            error: { message: 'Not informed' }
        })
    }
}


module.exports = {
    endPointError,
    authenticateToken,
    mongoConnection
}

