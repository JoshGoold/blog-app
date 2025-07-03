const Like = require('../../models/LikeSchema')
const Blog = require("../../models/BlogSchema")
const User = require("../../models/UserSchema")
const express = require("express")

const app = express.Router()


app.post("/like", async (req,res)=> {
    const {user_id, blog_id} = req.body;
    try {
        const user = await User.findById(user_id)
        if(!user){
            return res.status(404).send({Message: "No user found", Success: false})
        }
        const blog = await Blog.findById(blog_id).populate("likes")
        if(!blog){
            return res.status(404).send({Message: "No blog found", Success: false})
        }
        
        const alreadyLiked = await Like.findOne({ owner: user_id, _id: { $in: blog.likes } });
        if (alreadyLiked) {
        return res.status(200).send({ Message: "Already Liked", Success: false });
        }


        const like = new Like({owner:user_id})
        await like.save()
        blog.likes.push(like._id)
        await blog.save()
        await user.save()

        return res.send({Message: "Blog Liked", Blog: blog, Success: true})
    } catch (error) {
        console.error(error)
        return res.status(500).send({Message: "Error occured at /like route", Success: false})
    }
})


module.exports = app;