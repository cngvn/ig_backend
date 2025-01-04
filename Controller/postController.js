const postModel = require("../Models/postSchema");
const userModel = require("../Models/userSchema");

const postsCreate = async (req, res) => {
  const { caption, postImg, userId, postId } = req.body;

  try {
    const createdPost = await postModel.create({
      caption,
      postImg,
      userId,
      postId,
    });

    const response = await userModel.findByIdAndUpdate(userId, {
      $push: {
        posts: createdPost._id,
      },
    });

    res.json(response);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const posts = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate({
        path: "comment",
        select: "comment",
        populate: {
          path: "userId",
          select: "username profileImg",
        },
      })
      .populate({
        path: "likes",
        select: "username profileImg",
      })
      .populate({
        path: "userId",
        select: "username profileImg",
      });

    res.json(posts);
  } catch (err) {
    res.json(err);
  }
};

const postsComment = async (req, res) => {
  const { postId } = req.params;

  try {
    console.log(postId);
    const posts = await postModel.findById(postId).populate({
      path: "comment",
      select: "comment",
      populate: {
        path: "userId",
        select: "username profileImg",
      },
    });

    res.json(posts);
  } catch (err) {
    res.json(err);
  }
};

module.exports = { postsCreate, posts, postsComment };
