const express = require("express");
const createError = require("http-errors");

const { Connection, Post, Comment } = require("../models");


const router = express.Router();

router
    .route("/:postId/comment")
    .all((req, res, next) => Promise.resolve()
        .then(() => Connection.then())
        .then(() => { next() })
        .catch(err => next(err)))
    .post((req, res, next) => Promise.resolve()
        .then(() => new Comment({ ...req.body, post: req.params.postId, profile: req.user.profile._id }).save())
        .then(comment => Post.findByIdAndUpdate(comment.post, { $push: { comments: comment._id } })
            .then((Post) => { req.publish("notifications", "comment-new", comment._id.toString(), { id: Post.profile._id.toString() }) }))
        .then((post) => res.status(201).json(post))
        .catch(err => next(err)));


module.exports = router;