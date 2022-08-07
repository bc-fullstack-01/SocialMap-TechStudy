const express = require("express");
const upload = require("../middlewares/upload")

const { Post, Comments, Profile } = require("../models")


const router = express.Router();

router
    .route("/")
    .get((req, res, next) => Promise.resolve()
        .then(() => Post.find({}))
        .then((data) => { res.status(200).json(data) })
        .catch(err => next(err)))
    .post(upload.concat([(req, res, next) => Promise.resolve()
        .then(() => new Post({ ...req.body, profile: req.user.profile }).save()
            .then((post) => Profile.findByIdAndUpdate(req.user.profile, { $push: { posts: post._id } }))
            .then((post) => req.publish("notifications", "post-new", post._id, { id: req.user.profile.followers.map((item) => item.toString()) || [] }))
        )
        .then(() => res.status(201).json({ message: "Created a Post" }))
        .catch(err => next(err))]))

router
    .route("/:id")
    .get((req, res, next) => Promise.resolve()
        .then(() => Post.findById(req.params.id).populate('profile', ['name', 'midia']).
            populate({ path: 'comments', populate: { path: 'profile', select: ['name', 'midia'] } }))
        .then(data => res.status(200).json(data))
        .catch(err => next(err))
    )
    .delete((req, res, next) => Promise.resolve()
        .then(() => Post.findByIdAndDelete(req.params.id))
        .then(() => Comments.find({ post: req.params.id }).deleteMany())
        .then(() => { res.status(200).send({ message: "Successfully Deleted" }) })
        .catch(err => next(err))
    )
    .put((req, res, next) => Promise.resolve()
        .then(() => Post.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true
        }))
        .then(() => {
            res.status(200).send({ message: "Updated a Post" })
        })
        .catch(err => next(err))
    );

router
    .route("/:id/like")
    .post((req, res, next) => Promise.resolve()
        .then(() => Post.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user.profile } }))
        .then((post) => req.publish("notifications", "post-like", post._id, { id: post.profile.toString() }))
        .then(() => res.status(200).send({ message: "Liked Post" }))
        .catch(err => next(err))
    )

router
    .route("/:id/unlike")
    .post((req, res, next) => Promise.resolve()
        .then(() => Post.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user.profile } }))
        .then(() => res.status(200).send({ message: "Unliked Post" }))
        .catch(err => next(err))
    )


module.exports = router;
