const express = require("express")
const Blog = require("../../models/BlogSchema")


const app = express.Router()


app.get("/blog", async (req, res) => {
    const { blog_id } = req.query;

  try {
    const blog = await Blog.findById(blog_id).populate([
  {
    path: "comments",
    model: "Comment",
    populate: [
      {
        path: "comments", 
        model: "Comment",
        populate: {
          path: "likes",
          model: "Like"
        }
      },
      {
        path: "likes",
        model: "Like"
      },
      {
        path: "owner",
        model: 'User'
      }
    ]
  },
  {
    path: "likes",
    model: "Like"
  }
])
    if(!blog){
        return res.status(404).send({Message: `No Blog found with id = ${blog_id}`, Success: false})
    }
    return res.send({Message: "Blogs located & Inbound", Blog: blog, Success: true})
  } catch (error) {
   console.error(error)
   return res.status(500).send({Message: "Error occured at /blogs route", Error: error.message, Success: false})
  }
});




module.exports = app;
