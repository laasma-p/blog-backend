const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const authenticateToken = require("../middleware/jwt");

router.get("/posts-list", authenticateToken, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { userId: req.userId },
      attributes: ["id", "title", "date", "isPinned", "status"],
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/delete-post/:postId", authenticateToken, async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findOne({
      where: {
        id: postId,
        userId: req.userId,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.destroy();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/pin-post/:postId", authenticateToken, async (req, res) => {
  const { postId } = req.params;

  try {
    const pinnedCount = await Post.count({
      where: { userId: req.userId, isPinned: true },
    });

    const post = await Post.findOne({
      where: { id: postId, userId: req.userId },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.isPinned && pinnedCount >= 3) {
      return res
        .status(400)
        .json({ message: "Maximum of 3 pinned posts reached" });
    }

    post.isPinned = !post.isPinned;
    await post.save();

    res.status(200).json({
      message: post.isPinned
        ? "Post pinned successfully"
        : "Post unpinned successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/add-a-post", authenticateToken, async (req, res) => {
  const { title, content, status } = req.body;

  try {
    const newPost = await Post.create({
      title,
      content,
      status,
      userId: req.userId,
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
