const Comment = require('../../models/CommentSchema')
// const Blog = require("../../models/BlogSchema")
const User = require("../../models/UserSchema")
const express = require("express")

const app = express.Router()


app.post("/reply", async (req,res)=> {
    const {user_id, comment_id, text} = req.body;
    try {
         const user = await User.findById(user_id)
                if(!user){
                    return res.status(404).send({Message: "No user found", Success: false})
                }
                const comment = await Comment.findById(comment_id).populate("likes comments")
                if(!comment){
                    return res.status(404).send({Message: "No comment found", Success: false})
                }
                const reply = new Comment({owner: user_id, text})
                await reply.save()
                comment.comments.push(reply._id)
                await comment.save()
                return res.send({Message: "Replied to comment", Success: true, Comment: comment})
    } catch (error) {
        console.error(error)
        return res.status(500).send({Message: "Error occured at /reply route", Success: false})
    }
})


module.exports = app;