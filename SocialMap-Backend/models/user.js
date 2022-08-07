const { Schema, model } = require('mongoose')


const postSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2
    },
    user: {
        type: String,
        required: true,
        unique: true,
        minLength: 2
    },
    password: {
        type: String,
        required: true,
        minLength: 2
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    },
})

module.exports = model('User', postSchema)