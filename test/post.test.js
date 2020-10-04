const expect = require('expect');

// Testing unit function (defined in utilities.js)
const { getAllPosts, loadData, getDataFileRelativeToApp, getPostById, addPost } = require('../server/util/utilities');

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

describe('test for add post' () => {
    
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
