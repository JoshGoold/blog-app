const Comment = require("../../models/CommentSchema")
const User = require("../../models/UserSchema")
const Blog = require("../../models/BlogSchema")

const express = require("express")

const app = express.Router()


app.get("/comments", async (req,res)=> {
    const {blog_id} = req.query;
    try {
        const blog = await Blog.findById(blog_id).populate("comments").select("comments")
        if(!blog){
            return res.status(404).send({Message: "No blogs found", Success: false})
        }
        return res.send({Message: "Updated Comments", Comments: blog.comments, Success: true})
    } catch (error) {
        console.error(error)
        return res.status(500).send({Message: "Error occured at get /comments route", Success: false, Error: error.message})
    }
})


module.exports = app;