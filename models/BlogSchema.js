const mongoose = require("mongoose")

const BlogSchema = mongoose.Schema({
    title: {type:String, required:true},
    body: {type:String, required: true},
    views: [{type: mongoose.SchemaTypes.ObjectId, ref: "View"}],
    likes: [{type: mongoose.SchemaTypes.ObjectId, ref: "Like"}],
    comments: [{type: mongoose.SchemaTypes.ObjectId, ref: "Comment"}],
    category: {type:String, required: true},
    owner: {type: mongoose.SchemaTypes.ObjectId, ref: "User"}
})

module.exports = mongoose.model("Blog", BlogSchema)