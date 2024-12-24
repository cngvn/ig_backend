const { Router } = require("express");
const {
  postsCreate,
  posts,
  postsComment,
} = require("../Controller/postController");
const { query } = require("querystring");
const auth = require("../authenticator");

const postRoute = Router();

postRoute.get("/posts", auth, posts);

postRoute.post("/posts/create", auth, postsCreate);

postRoute.get("/posts/:postId", auth, postsComment);

module.exports = postRoute;
