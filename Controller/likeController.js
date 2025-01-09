const likeModel = require("../Models/likeSchema");
const postModel = require("../Models/postSchema");

// Liking a post
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

// Unliking a post
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

// Check if the user has already liked the post
const checkLikeStatus = async (req, res) => {
  const { postId, userId } = req.body;

  if (!userId || !postId) {
    return res.status(400).json({ error: "User ID and Post ID are required" });
  }

  try {
    const post = await postModel.findById(postId);
    const isLiked = post.likes.includes(userId);

    res.json({ isLiked });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { like, unlike, checkLikeStatus };
