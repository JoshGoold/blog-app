const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    blogs: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Blog"
    }]
})

module.exports = mongoose.model("User", UserSchema)