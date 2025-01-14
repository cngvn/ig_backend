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
  const { userId, followId } = req.body;

  if (userId == followId) {
    return res.json("cant folow ur own shit dumass pumpkin");
  }

  try {
    const followed = await userModel.findByIdAndUpdate(
      followId,
      {
        $addToSet: {
          followers: userId,
        },
      },
      { new: true }
    );

    const following = await userModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          following: followId,
        },
      },
      { new: true }
    );

    res.json({ message: "followed succesfuly" });
  } catch (err) {
    console.log(err);
  }
};

const unfollow = async (req, res) => {
  const { userId, unfollowId } = req.body;

  if (userId == unfollowId) {
    return res.json({ message: "cant follow urself" });
  }

  try {
    const unfollow = await userModel.findByIdAndUpdate(
      userId,
      {
        $pull: {
          following: unfollowId,
        },
      },
      { new: true }
    );

    const unfollowed = await userModel.findByIdAndUpdate(
      unfollowId,
      {
        $pull: {
          followers: userId,
        },
      },
      { new: true }
    );

    res.json({ message: "unfollowed succesfully" });
  } catch (err) {
    res.json(err);
  }
};
const getOneUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userModel.findById(userId).populate({
      path: "posts",
      select: "postImage caption ",
    });
    res.send(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { signup, login, userPosts, follow, unfollow, getOneUser };
