const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const User = require("./user");

const Post = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("published", "draft"),
    allowNull: false,
    defaultValue: "published",
  },
  isPinned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Post.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Post, { foreignKey: "userId" });

module.exports = Post;
