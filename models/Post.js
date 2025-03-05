const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Category = require("./Category");

const Post = sequelize.define("post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Post.belongsTo(Category, { foreignKey: "categoryId", onDelete: "CASCADE" });
Category.hasMany(Post, { foreignKey: "categoryId" });

module.exports = Post;
