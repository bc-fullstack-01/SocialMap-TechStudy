const express = require("express");
const { createUserProfile, followAndFollowing, commentAndLike } = require('../libs/seed')

const router = express.Router();


const user_names = [
    'admin',
    'carlos Alberto',
    'pedro andre serra',
    'João do grau',
    'ana laize',
    'Pedro Antonio',
    'Larisa Alcântara',
    'aline mineiro',
    'valeria alfrega de nobrega',
    'carla antonieta',
    'weyder veryder',
    'Lucas Neves dos Santos',
    'Jośe Edno'
]


router
    .route("/")
    .get((req, res, next) => createUserProfile(user_names)
        .then(() => followAndFollowing())
        .then(() => commentAndLike())
        .then(() => res.status(200).send({ message: "populated bank" }))
        .catch(err => next(err)))

module.exports = router
