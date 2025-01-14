const { Router } = require("express");
const {
  signup,
  login,
  userPosts,
  follow,
  unfollow,
  getOneUser,
  followed,
  following,
} = require("../Controller/userController");

const userModel = require("../Models/userSchema");
const userRoute = Router();
const auth = require("../authenticator");

userRoute.post("/signup", signup);

userRoute.post("/login", login);

userRoute.post("/user/posts", auth, userPosts);

userRoute.post("/user/follow", auth, follow);

userRoute.get("/getOneUser/:userId", auth, getOneUser);

userRoute.get("/followed/:userId", auth, followed);

userRoute.get("/following/:userId", auth, following);

userRoute.post("/user/unfollow", auth, unfollow);

module.exports = userRoute;
