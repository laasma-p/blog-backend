const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

module.exports = router;
