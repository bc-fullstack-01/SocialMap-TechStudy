const express = require("express");
const { Post, Profile } = require("../models")

const router = express.Router();

router
    .route("/")
    .get((req, res, next) => Promise.resolve()
        .then(() => Profile.findById(req.user.profile.id))
        .then((profile) => Post
            .find({ profile: { $in: [...profile.following, req.user.profile._id] } })
            .populate('profile')
            .limit(10)
            .skip((req.query.page || 0) * 10)
            .sort({ createdAt: 'desc' })
        )
        .then((data) => res.status(200).json(data))
        .catch(err => next(err))
    )

router
    .route("/profile/:id")
    .get((req, res, next) => Promise.resolve()
        .then(() => Post.find({profile:req.params.id}).populate('profile'))
        .then((data) => res.status(200).json(data))
        .catch(err => next(err))
    )

module.exports = router