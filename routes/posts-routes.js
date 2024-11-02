const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const adminUser = await User.findOne({ where: { role: process.env.ROLE } });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found." });
    }

    const posts = await Post.findAll({
      where: { userId: adminUser.id, status: "published" },
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

router.get("/pinned", async (req, res) => {
  try {
    const adminUser = await User.findOne({ where: { role: process.env.ROLE } });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found." });
    }

    const pinnedPosts = await Post.findAll({
      where: {
        isPinned: true,
        userId: adminUser.id,
        status: "published",
      },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    res.json(pinnedPosts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch featured posts." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const adminUser = await User.findOne({ where: { role: process.env.ROLE } });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found." });
    }

    const post = await Post.findOne({
      where: {
        id: req.params.id,
        userId: adminUser.id,
        status: "published",
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post is not found." });
    }

    const responseData = {
      id: post.id,
      title: post.title,
      content: post.content,
      date: post.createdAt,
      editDate: post.updatedAt,
      admin: {
        firstName: adminUser.firstName,
      },
    };

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch individual post." });
  }
});

module.exports = router;
