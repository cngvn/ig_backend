const likeModel = require("../Models/likeSchema");
const postModel = require("../Models/postSchema");

// likes post with userId
const like = async (req, res) => {
  const { userId, post } = req.body;

  try {
    const response = await postModel.findByIdAndUpdate(
      post,
      {
        $addToSet: {
          likes: userId,
        },
      },
      { new: true }
    );

    res.json(response);
  } catch (err) {
    res.json(err);
  }
};

//same function as like
const unlike = async (req, res) => {
  const { userId, post } = req.body;

  try {
    const response = await postModel.findByIdAndUpdate(post, {
      $pull: {
        likes: userId,
      },
    });

    res.json(response);
  } catch (err) {
    res.json(err);
  }
};

//finds the post and populates the like with username
const coutLike = async (req, res) => {
  const { post } = req.body;
  console.log(post);
  try {
    const response = await postModel
      .findById({ _id: post })
      .populate("likes", "username profileImg");
    res.json(response);
  } catch (err) {
    res.json(err);
  }
};

module.exports = { unlike, like, coutLike };
