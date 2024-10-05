const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth-routes");
const postsRoutes = require("./routes/posts-routes");

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port number ${PORT}...`);
});
