const express = require("express")
const Blog = require("../../models/BlogSchema")


const app = express.Router()


app.get("/blogs", async (req, res) => {
    const { category, pageSize = 15, page = 1} = req.query;

    const parsedPageSize = parseInt(pageSize)
    const parsedPage = parseInt(page)

  try {
    const blogs = await Blog.find({ category })
    .skip((parsedPage - 1) * parsedPageSize)
    .limit(parsedPageSize)
    .lean()

    const totalCount = await Blog.countDocuments({ category })

    if(blogs.length === 0){
        return res.status(404).send({Message: 'No Blogs within this category', Success: false})
    }
    return res.send({Message: "Blogs located & Inbound", Blogs: blogs, Page: parsedPage, TotalPages: Math.ceil(totalCount / parsedPageSize), Success: true})
  } catch (error) {
   console.error(error)
   return res.status(500).send({Message: "Error occured at /blogs route", Error: error.message, Success: false})
  }
});




module.exports = app;
