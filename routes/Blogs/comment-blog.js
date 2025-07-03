const Comment = require('../../models/CommentSchema')
const Blog = require("../../models/BlogSchema")
const User = require("../../models/UserSchema")
const express = require("express")

const app = express.Router()


app.post("/comment", async (req,res)=> {
    const {user_id, blog_id, text} = req.body;
    try {
         const user = await User.findById(user_id)
                if(!user){
                    return res.status(404).send({Message: "No user found", Success: false})
                }
                const blog = await Blog.findById(blog_id).populate("likes comments")
                if(!blog){
                    return res.status(404).send({Message: "No blog found", Success: false})
                }
                const comment = new Comment({owner: user_id, text})
                await comment.save()
                blog.comments.push(comment._id)
                await blog.save()
                return res.send({Message: "Commented", Success: true, Blog: blog})
    } catch (error) {
        console.error(error)
        return res.status(500).send({Message: "Error occured at /comment route", Success: false})
    }
})


module.exports = app;