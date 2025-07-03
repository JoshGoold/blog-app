const express = require("express")
const read = require("../../utils/read")


const app = express.Router()



app.get("/read", async (req,res)=>{
    try {
        const html = await read("read.html")
        if(!html){
            return res.status(404).send({Message: "No page found", Success: false})
        }
        return res.send(html)
    } catch (error) {
        console.error(error)
        return res.status(500).send({Message: "Error occured at /read", Success: false})
    }
})





module.exports = app;