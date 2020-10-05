const express = require('express');
const app = express();
const port = 3000;
const postRouter = require('./routes/post_routes');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Posts
// When there are any /posts/* requests direct them to the post_routes file
app.use('/posts', postRouter)

app.listen(port, () => {
    console.log('Listening at http://localhost:' + port)
})