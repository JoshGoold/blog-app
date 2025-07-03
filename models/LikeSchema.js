const mongoose = require("mongoose")

const LikeSchema = mongoose.Schema({
    owner: {type: mongoose.SchemaTypes.ObjectId, ref: "User"},
})

module.exports = mongoose.model("Like", LikeSchema)