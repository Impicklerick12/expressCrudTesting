const expect = require('expect');

// Testing unit function (defined in utilities.js)
const { getAllPosts, loadData, getDataFileRelativeToApp, getPostById, addPost, updatePost } = require('../server/util/utilities');

const fs = require('fs');

// Require test data file
const testDataFile = '../server/data/blog_posts.test.json';
const testDataFileForWrite = getDataFileRelativeToApp(testDataFile)

// Set up test data to begin with
beforeEach(() => {
    setUpData()
});

describe('get All posts', () => {
    test('should get a post if one exists', () => {
        expect(Object.keys(getAllPosts({})).length).toBe(1)
    });

    test('username of the first post must be Luke', () => {
        expect(getAllPosts({})["1"].username).toBe("Luke")
    });
})

describe('get post by id', () => {
    const request = {
        params: {
            id: "1"
        }
    }
    test('user of post with id 1 should be Luke', () => {
        expect(getPostById(request).username).toBe("Luke")
    })
})

describe("addPost", () => { 
    test("should add a post", () => { 
        // define a req object with expected structure 
        const request = { 
            body: { 
                title: "Another post", 
                username: "tester", 
                content: "This is another blog post!", 
                category: "" 
            } 
        } 
        let post = addPost(request)
        expect(post.title).toBe(request.body.title) 
    })
})

// updatePost
describe("updatePost", () => {
	it("should update a post", () => {
		// set up a req object
		const request = {
			params: {
				id: "1"
			},
			body: {
				title: "Updated post",
				username: "tester",
				content: "This is an updated blog post!",
				category: ""
			}
		}
		let post = updatePost(request)
		expect(post.title).toBe(request.body.title)
	})
})

function setUpData() {
    let testPostData = {}
    let testPost = {}
    let date = Date.now()
    testPost.title = "Test Post 1";
    testPost.username = "Luke";
    testPost.create_date = date;
    testPost.modified_date = date;
    testPostData["1"] = testPost;

    fs.writeFileSync(testDataFileForWrite, JSON.stringify(testPostData))
    loadData(testDataFileForWrite)
}

// Testing unit functions defined in utilities.js

