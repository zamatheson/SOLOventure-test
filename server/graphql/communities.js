const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 3001;

// Load environment variables from .env file
dotenv.config();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, httpOnly: true, maxAge: 60000 }
}));

const posts = [
  {
    id: 1,
    content: 'Hello, world!',
    comments: [
      { id: 1, content: 'This is a comment.' },
      { id: 2, content: 'Another comment.' }
    ]
  },
  { id: 2, content: 'This is a test post.' }
];

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const { content } = req.body;

  // Validate the incoming request
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  // Here you can save the new post to your database or any other data source
  const newPost = { id: Date.now(), content };
  posts.push(newPost);

  res.json(newPost);
});

app.post('/api/posts/:postId/comments', (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  // Find the post by id
  const post = posts.find(p => p.id === parseInt(postId));

  // Validate the incoming request
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  // Add the new comment to the post
  const newComment = { id: Date.now(), content };
  post.comments.push(newComment);

  res.json(newComment);
});

app.get('/api/posts/:postId/comments', (req, res) => {
  const { postId } = req.params;

  // Find the post by id
  const post = posts.find(p => p.id === parseInt(postId));

  // Validate the incoming request
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json(post.comments);
});

app.use((err, req, res, next) => {
  // Handle errors
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});