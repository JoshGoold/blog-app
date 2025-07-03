const express = require("express")
const Blog = require("../../models/BlogSchema")
const User = require("../../models/UserSchema")
const checkCategory = require("../../utils/catergories")


const app = express.Router()


app.post("/create-blog", async (req,res)=> {
    const {title, body, category, user_id} = req.body;
    try {
        const valid = checkCategory(category)
        if(!valid){
            return res.status(404).send({Message: "Invalid Category", Success:false})
        }
        const user = await User.findById(user_id).select("blogs")
        if(!user){
            return res.status(404).send({Message: "No user found", Success: false})
        } 
        const blog = new Blog({category, title, body})
        user.blogs.push(blog._id)
        await user.save()
        await blog.save()
        return res.send({Message: "Blog Uploaded", Blog: blog})
    } catch (error) {
        console.error(error)
        return res.status(500).send({Message: "Error occured at route /create-blog", Success: false})
    }
})


module.exports = app;