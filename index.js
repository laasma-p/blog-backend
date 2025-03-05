require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth-routes");
const postRoutes = require("./routes/post-routes");
const categoryRoutes = require("./routes/category-routes");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/categories", categoryRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
