const Like = require('../../models/LikeSchema')
const Comment  = require("../../models/CommentSchema")
const User = require("../../models/UserSchema")
const express = require("express")

const app = express.Router()


app.post("/like-comment", async (req,res)=> {
    const {user_id, comment_id} = req.body;
    try {
        const user = await User.findById(user_id)
        if(!user){
            return res.status(404).send({Message: "No user found", Success: false})
        }
        const comment = await Comment.findById(comment_id).populate("likes")
        if(!comment){
            return res.status(404).send({Message: "No comment found", Success: false})
        }
        
        const alreadyLiked = await Like.findOne({ owner: user_id, _id: { $in: comment.likes } });
        if (alreadyLiked) {
        return res.status(200).send({ Message: "Already Liked", Success: false });
        }


        const like = new Like({owner:user_id})
        await like.save()
        comment.likes.push(like._id)
        await comment.save()
        await user.save()

        return res.send({Message: "Comment Liked", Comment: comment, Success: true})
    } catch (error) {
        console.error(error)
        return res.status(500).send({Message: "Error occured at /like-comment route", Success: false})
    }
})


module.exports = app;