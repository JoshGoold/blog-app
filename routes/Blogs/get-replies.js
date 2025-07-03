const Comment = require("../../models/CommentSchema")
const User = require("../../models/UserSchema")


const express = require("express")

const app = express.Router()


app.get("/replies", async (req,res)=> {
    const {comment_id} = req.query;
    try {
        const comment = await Comment.findById(comment_id).populate("comments").select("comments")
        if(!comment){
            return res.status(404).send({Message: "No comment found", Success: false})
        }
        return res.send({Message: "Updated Comments", Replies: comment.comments, Success: true})
    } catch (error) {
        console.error(error)
        return res.status(500).send({Message: "Error occured at get /replies route", Success: false, Error: error.message})
    }
})


module.exports = app;