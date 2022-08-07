const express = require("express");
const { Profile } = require("../models")
const createError = require("http-errors");
const upload = require("../middlewares/upload")
const router = express.Router();

router
    .route("")
    .get((req, res, next) => Promise.resolve()
        .then(() => Profile.find({ active: true }))
        .then(data => res.status(200).json(data))
        .catch(err => next(err)))
    .put(upload.concat([(req, res, next) => Promise.resolve()
        .then(() => Profile.findByIdAndUpdate(req.user.profile, req.body, { runValidators: true }))
        .then(() => res.status(200).send({ message: "Profile updated" }))
        .catch(err => next(err))]))

router
    .route("/search")
    .get((req, res, next) => Promise.resolve()
        .then(() => Profile.find(
            { $text: { $search: `${req.query, q}` } },
            { active: true },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } }))
        .then(data => data ? res.status(200).json(data) : next(createError(404)))
        .catch(err => next(err)))

router
    .route("/:id")
    .get((req, res, next) => Promise.resolve()
        .then(() => Profile.findById(req.params.id))
        .then(data => res.status(200).json(data))
        .catch(err => next(err))
    )

router
    .route("/:id/follow")
    .post((req, res, next) => Promise.resolve()
        .then(() => Profile.findByIdAndUpdate(req.params.id, { $addToSet: { followers: req.user.profile } }))
        .then(profile => {
            Profile.findByIdAndUpdate(req.user.profile, { $addToSet: { following: req.params.id } })
                .then(req.publish("notifications", "follow-new", profile._id.toString(), { id: req.params.id }))
        })
        .then(() => res.status(200).send({ message: "Following" }))
        .catch(err => next(err)))

router
    .route("/:id/unfollow")
    .post((req, res, next) => Promise.resolve()
        .then(() => Profile.findByIdAndUpdate(req.params.id, { $pull: { followers: req.user.profile } }))
        .then(() => Profile.findByIdAndUpdate(req.user.profile, { $pull: { following: req.params.id } }))
        .then(() => res.status(200).send({ message: "Unfollowed" }))
        .catch(err => next(err))
    )

router
    .route("/:id/followers")
    .get((req, res, next) => Promise.resolve()
        .then(() => Profile.findById(req.params.id).populate('followers', ['name', 'midia']))
        .then((profile) => res.status(200).json({ users: profile.followers }))
        .catch(err => next(err))
    )


module.exports = router