const mongoose = require("mongoose")

const CommentSchema = mongoose.Schema({
    text: {type:String, required:true},
    owner: {type: mongoose.SchemaTypes.ObjectId, ref: "User"},
    likes: [{type: mongoose.SchemaTypes.ObjectId, ref: "Like"}],
    comments: [{type: mongoose.SchemaTypes.ObjectId, ref: "Comment"}]
})

module.exports = mongoose.model("Comment", CommentSchema)