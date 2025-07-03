const bcrypt = require("bcrypt")

async function hash(password){
    try {
        const hashed = await bcrypt.hash(password, 10);
        if(!hashed){
            return ""
        }
        return hashed
    } catch (error) {
        console.error(error)
        return ""
    }
}


module.exports = hash;