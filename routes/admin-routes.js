const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const authenticateToken = require("../middleware/jwt");

router.get("/posts-list", authenticateToken, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { userId: req.userId },
      attributes: ["id", "title", "date", "isPinned"],
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
