const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./Routes/userRoute.js");
const postRoute = require("./Routes/postRoute.js");
const commentRoute = require("./Routes/commentRoute.js");
const likeRoute = require("./Routes/likeRoute.js");
const cors = require("cors");

dotenv.config();

const app = express();
const port = 8080;
app.use(cors());
const connectDatabase = async () => {
  const res = await mongoose.connect(process.env.MONGODB_URI);

  if (res) console.log("db connected");
  console.log(typeof process.env.MONGODB_URI);
};

connectDatabase();

app.use(express.json());

app.use(userRoute);

app.use(postRoute);

app.use(commentRoute);

app.use(likeRoute);

app.listen(port, () => {
  console.log(`your backend server is running on ${port}`);
});
