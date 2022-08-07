const express = require("express");
const createError = require("http-errors");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { Profile, User } = require("../models");

const router = express.Router()


router
    .route("/me")
    .get((req, res, next) => Promise.resolve()
        .then(() => res.status(201).json(req.user))
        .catch((err) => next(err)))
    .put((req, res, next) => Promise.resolve()
        .then(() => req.body.password ? bcrypt.hash(req.body.password, 10) : false)
        .then((data) => data ?
            User.findByIdAndUpdate(req.user.id, { ...req.body, password: data }, { runValidators: true })
            : User.findByIdAndUpdate(req.user.id, req.body, { runValidators: true }))
        .then(() => req.body.name ? req.body.name : false)
        .then(data => data ?
            Profile.findByIdAndUpdate(req.user.profile, { name: data }, { runValidators: true }) : {})
        .then(() => res.status(200).send({ message: "User updated" }))
        .catch(err => next(err)))
    .delete((req, res, next) => Promise.resolve()
        .then(() => User.findByIdAndDelete(req.user.id))
        .then(user => Profile.findOneAndUpdate({ user: user }, { active: false }))
        .then(() => res.status(200).send({ message: "User deleted" }))
        .catch(err => next(err)))



module.exports = router;