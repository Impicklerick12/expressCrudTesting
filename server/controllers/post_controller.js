const { getAllPosts, getPostById, addPost, updatePost } = require('../util/utilities');

const getPosts = (request, response) => {

    // Util file would be the best place to have your logic + helper function
    // It can be accessed by both tester and controller
    response.send(getAllPosts(request))
}

const getPost = (request, response) => {
    let post = getPostById(request)
    if (post) request.send(post)
    else {
        response.status(404);
        response.send(request.error)
    }
}

const makePost = (request, response) => {
    let post = addPost(request)
    if (post) {
        response.status(201)
        response.send(post)
    } else {
        response.status(500)
        response.send(request.error)
    }
}

const changePost = function(request, response) {
	let post = updatePost(request)
	if (post) {
		response.status(200)
		response.send(post)
	} else {
		response.status(500)
		response.send(request.error)
	}
}

module.exports = {
    getPosts,
    getPost,
    makePost,
    changePost
}
