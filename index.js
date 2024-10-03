const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is listening on port number ${PORT}...`);
});
