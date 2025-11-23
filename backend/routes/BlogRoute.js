const express = require('express');
const router = express.Router();
const BlogPost = require('../models/Blog');
const Comment = require('../models/Comments');
const parser = require("../middleware/cloudinaryUpload");

// GET all blog posts with a limit (e.g., GET /api/blogs?limit=3)
router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const blogs = await BlogPost.find({}, 'title date description author image')
      .limit(limit ? parseInt(limit) : 0);  // Apply limit if provided
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/comments (fetch all with blog info)
router.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('blogId', 'title') // only fetch blog title
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new blog post (admin only)
router.post('/', parser.single("image"), async (req, res) => {
  try {
    const { title, description, date, author, content } = req.body;
    const imageUrl = req.file?.path || ""; // Cloudinary URL
    const newPost = new BlogPost({ title, description, date, author, content, image: imageUrl, });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a blog post by ID (admin only)
router.put('/:id', parser.single("image"), async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Not found' });

    // If a new image is uploaded, use it; otherwise retain the existing one
    const updatedFields = {
      title: req.body.title || blog.title,
      description: req.body.description || blog.description,
      date: req.body.date || blog.date,
      author: req.body.author || blog.author,
      content: req.body.content || blog.content,
      image: req.file?.path || blog.image, // Use new image if uploaded
    };

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true, runValidators: true }
    );

    res.json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// router.put('/:id', async (req, res) => {
//   try {
//     const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!updatedPost) return res.status(404).json({ message: 'Not found' });
//     res.json(updatedPost);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// DELETE a blog post by ID (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/blogs/:id/comments
router.get('/:id/comments', async (req, res) => {
  const comments = await Comment.find({ blogId: req.params.id }).sort({ createdAt: -1 });
  res.json(comments);
});

// POST /api/:id/comments
router.post('/:id/comments', async (req, res) => {
  const newComment = new Comment({
    blogId: req.params.id,
    name: req.body.name,
    text: req.body.text,
  });
  await newComment.save();
  res.json(newComment);
});

// DELETE /api/comments/:id
router.delete('/comments/:id', async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Comment not found' });
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
