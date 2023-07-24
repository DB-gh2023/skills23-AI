// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
// Create a new express app
const app = express();
// Use json body parser
app.use(bodyParser.json());
// Use cors
app.use(cors());
// Create a map to store comments
const commentsByPostId = {};
// Create a route handler for GET /posts/:id/comments
app.get('/posts/:id/comments', (req, res) => {
    // Return comments for the given post id
    res.send(commentsByPostId[req.params.id] || []);
});
// Create a route handler for POST /posts/:id/comments
app.post('/posts/:id/comments', (req, res) => {
    // Create a random id for the comment
    const commentId = randomBytes(4).toString('hex');
    // Get the content from the request body
    const { content } = req.body;
    // Get the comments for the given post id
    const comments = commentsByPostId[req.params.id] || [];
    // Add the new comment to the comments list
    comments.push({ id: commentId, content });
    // Store the comments list
    commentsByPostId[req.params.id] = comments;
    // Send back the comment
    res.status(201).send(comments);
});
// Start the web server on port 4001
app.listen(4001, () => {
    console.log('Listening on port 4001');
});