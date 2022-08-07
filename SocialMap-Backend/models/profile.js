const { Schema, model } = require('mongoose')

const profileSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please, insert at least 2 characters!'],
        minLength: 2
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'You are not logged in'],
        ref: 'User'
    },
    midia: {
        type: String,
        required: false,
        minLength: 2
    },
    about: {
        type: String,
        required: false,
        minLength: 2
    },
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    active:{
        type: Boolean, default: true
    }

})


profileSchema.index({ name: 'text' });
module.exports = model('Profile', profileSchema)