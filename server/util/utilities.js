const dataFile = '../data/blog_posts.json';
let blogPosts = require(dataFile);
const fs = require('fs');

const getAllPosts = (request, response) => {
    return blogPosts
}

const getPostById = (request, response) => {
    let post = blogPosts[request.params.id]
    if (post) return post
    else {
        request.error = "Post not found"
    }
}

const addPost = (request, response) => {
    try {
        const date = Date.now()
        let blogPost = {
            title: request.body.title,
            create_date: date,
            modified_date: date,
            username: request.body.username,
            content: request.body.content,
            category: request.body.category || ""
        }
        blogPosts[getNextId()] = blogPost
        // Node file write: In future this will be replaced with mongoDB create
        fs.writeFileSync(getDataFileRelativeToApp(dataFile), JSON.stringify(blogPosts))
        return blogPost
    } catch {
        console.log(error)
        request.error = error
        return null
    }
}
function getNextId() {
    let sortedIds = Object.keys(blogPosts).sort()
    nextId = (sortedIds.length != 0)
        ? parseInt(sortedIds[sortedIds.length - 1]) + 1
        : 1
    return nextId
}

// Functions for test purpose only, to load data and write to the file
// function loadData(path) {
//     blogPosts = JSON.parse(fs.readFileSync(path, 'utf8'))
// }
function loadData(path) {
    blogPosts = JSON.parse(fs.readFileSync(path, 'utf8'))
}

// function getDataFileRelativeToApp(file) {
//     return file.substring(file.lastIndexOf('../')) + 3, file.length 
// }
const getDataFileRelativeToApp = (file) => {
    // Remove the ../ from the dataFile path for writing
    // Because the writeFile looks for path relative to the app, not utilities.js
    return file.substring(file.lastIndexOf('../') + 3, file.length)
}

module.exports = { 
    getAllPosts,
    loadData,
    getDataFileRelativeToApp,
    getPostById,
    addPost
}