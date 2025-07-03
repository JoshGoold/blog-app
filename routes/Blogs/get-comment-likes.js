const Like = require("../../models/LikeSchema")
const User = require("../../models/UserSchema")
const Comment = require("../../models/CommentSchema")

const express = require("express")

const app = express.Router()


app.get("/comment-likes", async (req,res)=> {
    const {comment_id} = req.query;
    try {
        const comment = await Comment.findById(comment_id).populate("likes").select("likes")
        if(!comment){
            return res.status(404).send({Message: "No comments found", Success: false})
        }
        return res.send({Message: "Updated Likes", Likes: comment.likes, Success: true})
    } catch (error) {
        console.error(error)
        return res.status(500).send({Message: "Error occured at get /comment-likes route", Success: false, Error: error.message})
    }
})


module.exports = app;