const userModel = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// creates new user
const signup = async (req, res) => {
  const { username, password, email, profileImg } = req.body;
  console.log(req.body);
  try {
    const reso = await userModel.create({
      username: username,
      password: password,
      email: email,
      profileImg: profileImg,
    });

    const payload = {
      userId: reso._id,
      username: username,
    };
    console.log(payload);
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign(
      {
        userId: reso._id,
        username: username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    console.log(token);
    res.status(201).json({
      message: "User created successfully!",
      token: token,
    });
  } catch (err) {
    res.json(err);
  }
};

// finds the email and sends info of it
const login = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await userModel
      .findOne({ email, username })
      .populate("posts", "caption postImg")
      .populate("followers", "username");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password != password) {
      return res.status(400).json("Password invalid");
    }

    const payload = {
      userId: user._id,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json(token);
  } catch (err) {
    res.json(err);
  }
};

// finds all users and populates their posts
const userPosts = async (req, res) => {
  try {
    const posts = await userModel.find().populate("posts", "caption");

    console.log({ posts });

    res.json(posts);
  } catch (err) {
    res.json(err);
  }
};

const follow = async (req, res) => {
  try {
    const followingUserId = req.body.followingUserId;
    const userId = req.body.userId;
    const following = await userModel.findByIdAndUpdate(userId, {
      $addToSet: {
        following: followingUserId,
      },
      new: true,
    });
    const follower = await userModel.findByIdAndUpdate(followingUserId, {
      $addToSet: {
        followers: userId,
      },
      new: true,
    });
    res.send(following);
  } catch (error) {
    res.send(error);
  }
};

const unfollow = async (req, res) => {
  try {
    const userId = req.body.userId;
    const unfollowingUserId = req.body.unfollowingUserId;

    const unfollowing = await userModel.findByIdAndUpdate(userId, {
      $pull: {
        following: unfollowingUserId,
      },
      new: true,
    });

    const unfollower = await userModel.findByIdAndUpdate(unfollowingUserId, {
      $pull: {
        followers: userId,
      },
      new: true,
    });
    res.send(unfollowing);
  } catch (error) {
    res.send(error);
  }
};
const getOneUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userModel.findById(userId).populate({
      path: "posts",
      select: "postImg caption ",
    });
    res.send(user);
  } catch (err) {
    console.log(err);
  }
};
const followed = async (req, res) => {
  try {
    const { userId } = req.params;
    const followedUsers = await userModel.findById({ _id: userId }).populate({
      path: "followers",
      select: "profileImg username ",
    });
    res.send(followedUsers.followers);
  } catch (error) {
    res.send(error);
  }
};
const following = async (req, res) => {
  try {
    const { userId } = req.params;
    const followingUsers = await userModel.findById({ _id: userId }).populate({
      path: "following",
      select: "profileImage username ",
    });
    res.send(followingUsers.following);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  signup,
  login,
  userPosts,
  follow,
  unfollow,
  getOneUser,
  followed,
  following,
};
