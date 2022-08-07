const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    description: {
        type: String,
        required: [true, "Comment description can't be empty"],
        minLength: [2, `Minimum of 2 characters, " {VALUE} " unmet quantity`]
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: "Profile",
        required: true
    },
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
});


module.exports = model("Comment", commentSchema)