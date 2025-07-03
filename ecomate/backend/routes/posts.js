const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // Multer config

// GET /api/posts - fetch all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ timestamp: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// POST /api/posts - create new post with optional media file
router.post('/', auth, upload.single('media'), async (req, res) => {
  const { content, user } = req.body;
  if (!content || !user) return res.status(400).json({ message: 'Missing fields' });

  let mediaUrl = '';
  let type = 'tip'; // default type is text

  if (req.file) {
  mediaUrl = `/uploads/${req.file.filename}`;
    const mime = req.file.mimetype;
    if (mime.startsWith('image')) type = 'article';
    else if (mime.startsWith('video')) type = 'event';
  }

  try {
    const parsedUser = typeof user === 'string' ? JSON.parse(user) : user;
    const newPost = new Post({
      content,
      type,
      link: mediaUrl,
      user: parsedUser
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Error creating post' });
  }
});

// POST /api/posts/:id/like - toggle like/unlike
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user.id;
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const alreadyLiked = post.likes.find(like => like.userId === userId);
    if (alreadyLiked) {
      post.likes = post.likes.filter(like => like.userId !== userId);
    } else {
      post.likes.push({ userId });
    }

    await post.save();
    res.json({ likes: post.likes.length });
  } catch (err) {
    console.error('Like error:', err);
    res.status(500).json({ message: 'Error toggling like' });
  }
});

// POST /api/posts/:id/comment - add a comment
// POST /api/posts/:id/comment
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { text } = req.body;

    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({
      user: {
        id: req.user.id,      // make sure this exists
        name: req.user.name   // ensure name is available from auth middleware
      },
      text,
      timestamp: new Date()
    });

    await post.save();
    res.status(201).json(post.comments);
  } catch (err) {
    console.error('Comment error:', err);
    res.status(500).json({ message: 'Error adding comment' });
  }
});

// DELETE /api/posts/:id - delete a post (only by owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.user.id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this post' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Delete failed:', err);
    res.status(500).json({ message: 'Server error while deleting' });
  }
});


module.exports = router;