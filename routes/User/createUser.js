const express = require("express")
const User = require("../../models/UserSchema")
const hash = require("../../utils/hash");

const app = express.Router()


app.post("/create-user", async (req,res)=> {
    const {username, password, email} = req.body;
    try {
        const hashed = await hash(password)
        if(!hashed){
           return res.status(400).send({Message: "User could not be created password failed to hash", Success: false}) 
        }
        const user = new User({username,email,password:hashed})
        if(!user){
            return res.status(400).send({Message: "User could not be created", Success: false})
        }
        await user.save()
        return res.send({Message: "User created", User: user, Success: true})
    } catch (error) {
        console.error(error)
        return res.status(500).send({Message: "Error occured at /create-user route", Error: error.message, Success: false})
    }
})


module.exports = app;