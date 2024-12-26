const likeModel = require("../Models/likeSchema");
const postModel = require("../Models/postSchema");

const like = async (req, res) => {
  const { userId, postId } = req.body;

  if (!userId || !postId) {
    return res.status(400).json({ error: "User ID and Post ID are required" });
  }

  try {
    const response = await postModel.findByIdAndUpdate(
      postId,
      {
        $addToSet: { likes: userId },
      },
      { new: true }
    );

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

const unlike = async (req, res) => {
  const { userId, postId } = req.body;

  if (!userId || !postId) {
    return res.status(400).json({ error: "User ID and Post ID are required" });
  }

  try {
    const response = await postModel.findByIdAndUpdate(postId, {
      $pull: { likes: userId },
    });

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

const coutLike = async (req, res) => {
  const { postId } = req.body;

  if (!postId) {
    return res.status(400).json({ error: "Post ID is required" });
  }

  try {
    const response = await postModel
      .findById({ _id: postId })
      .populate("likes", "username profileImg");

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { unlike, like, coutLike };
