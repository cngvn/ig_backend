const { unlike, like, coutLike } = require("../Controller/likeController");
const Router = require("express");
const auth = require("../authenticator");

const likeRoute = Router();

likeRoute.post("/like", auth, like);

likeRoute.post("/unlike", auth, unlike);

likeRoute.get("/seeLikes", auth, coutLike);

module.exports = likeRoute;
