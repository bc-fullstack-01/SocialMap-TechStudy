const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    title: {
        type: String,
        minLength: 2
    },
    content: {
        type: String,
        required: [true, 'Input content is required'],
        minLength: 2
    },
    midia: {
        type: String,
        minLength: 2
    },
    profile: {
        type: Schema.Types.ObjectId,
        required: [true, 'Profile is required'],
        ref: 'Profile'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = model('Post', postSchema)