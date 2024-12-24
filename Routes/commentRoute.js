const { Router } = require("express");
const { comment } = require("../Controller/commentController");
const auth = require("../authenticator");

const commentRoute = Router();

commentRoute.post("/comment", auth, comment);

module.exports = commentRoute;
