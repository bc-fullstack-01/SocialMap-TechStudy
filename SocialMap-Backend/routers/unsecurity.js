const router = require("express").Router();
const { User, Profile } = require("../models");

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const createError = require("http-errors");


const ACCESS_TOKEN_SECRET = process.env.ACCES_TOKEN_SECRET || "thisismytoken"

router
    .route("/alluser")
    .get((req, res, next) => Promise.resolve()
        .then(() => User.find({}).populate("profile"))
        .then(data => res.status(200).json(data))
        .catch(err => next(err)))

router
    .route("/register")
    .post((req, res, next) => Promise.resolve()
        .then(() => bcrypt.hash(req.body.password, 10))
        .then(passwordHashed => new User({ ...req.body, password: passwordHashed }).save())
        .then(u => new Profile({ name: req.body.name, user: u._id }).save()
            .then(profile => User.findByIdAndUpdate(u._id, { profile: profile._id })))
        .then(() => res.status(201).json({ message: `User created` }))
        .catch(err => next(err)))

router
    .route("/login")
    .post((req, res, next) => Promise.resolve()
        .then(() => User.findOne({ user: req.body.user }).populate('profile', 'midia'))
        .then(data => {
            data ? bcrypt.compare(req.body.password, data.password)
                .then(passwordHash => {
                    var token = {
                        accessToken: jwt.sign({
                            name: data.name,
                            user: data.user,
                            profile_id: data.profile._id.toString(),
                            following: data.profile.following,
                        }, ACCESS_TOKEN_SECRET)
                    }
                    passwordHash ? res.status(201).json(token) : next(createError(401))
                }) : next(createError(401))
        })
        .catch((err) => next(err)))


module.exports = router