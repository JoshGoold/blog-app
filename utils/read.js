const fs = require("fs").promises
const path = require("path")

const base_path = path.join(__dirname, "..", "html")

async function read(file){
    try {
        const html = await fs.readFile(path.join(base_path, file), "utf8")
        if(!html){
            return ""
        }
        return html
    } catch (error) {
        console.error(error)
        return ""
    }
}

module.exports = read