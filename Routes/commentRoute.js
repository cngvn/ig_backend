const { Router } = require("express");
const { comment, comments } = require("../Controller/commentController");
const auth = require("../authenticator");

const commentRoute = Router();

commentRoute.post("/comment", auth, comment);
commentRoute.get("/comments:postId", auth, comments);

module.exports = commentRoute;
