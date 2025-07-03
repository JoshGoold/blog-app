

const categories = new Set(["Entertainment", "Sports", "Games", "Technology", "Philosophy", "Theology"])

function checkCategory(category){
    return categories.has(category)
}

module.exports = checkCategory;