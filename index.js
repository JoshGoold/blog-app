const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
require("dotenv").config()

//routes
const create_user = require("./routes/User/createUser")
const login = require("./routes/User/login")
const create_blog = require("./routes/Blogs/create-blog")
const like_blog = require("./routes/Blogs/like-blog")
const comment_blog = require("./routes/Blogs/comment-blog")
const reply_comment = require("./routes/Blogs/comment-comment")
const like_comment = require("./routes/Blogs/like-comment")
const get_comments = require('./routes/Blogs/get-comments')
const get_replies = require("./routes/Blogs/get-replies")
const get_comment_likes = require("./routes/Blogs/get-comment-likes")
const get_likes = require("./routes/Blogs/get-likes")
const get_blogs = require("./routes/Blogs/get-blogs")
const get_blog = require("./routes/Blogs/get-blog")
const get_homepage = require("./routes/Serve_HTML/get_homepage")
const get_explorepage = require("./routes/Serve_HTML/get_explorepage")
const get_readpage = require("./routes/Serve_HTML/get_readpage")
const get_create = require("./routes/Serve_HTML/get_create")
const read = require("./utils/read")




const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use("/", create_user)
app.use("/", login)
app.use("/", create_blog)
app.use("/", like_blog)
app.use("/", comment_blog)
app.use("/", reply_comment)
app.use("/", like_comment)
app.use("/", get_comments)
app.use("/", get_replies)
app.use("/", get_comment_likes)
app.use("/", get_likes)
app.use("/", get_blogs)
app.use("/", get_blog)
app.use("/", get_homepage)
app.use("/", get_explorepage)
app.use("/", get_readpage)
app.use("/", get_create)









mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("database connected...")
    app.listen(process.env.PORT, ()=> {
        console.log(`http://localhost:${process.env.PORT}`)
    })
})
.catch((e)=> {
    console.error(e)
})


app.get("/", async (req,res)=>{
    try {
        const html = await read("login.html")
        if(!html){
            return res.status(404).send({Message: "No page found", Success: false})
        }
        return res.send(html)
    } catch (error) {
        console.error(error)
        return res.status(500).send({Message: "Error occured at /", Success: false})
    }
})


module.exports = app;