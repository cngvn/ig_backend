const commentModel = require("../Models/commentsSchema");
const postModel = require("../Models/postSchema");

const comment = async (req, res) => {
  const { userId, comment, postId } = req.body;

  try {
    const createdComment = await commentModel.create({
      userId,
      comment,
      postId,
    });

    const response = await postModel.findByIdAndUpdate(postId, {
      $push: {
        comment: createdComment._id,
      },
    });

    res.json(response);
  } catch (err) {
    res.json(err);
  }
};
const comments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comment = await postModel.findById(postId).populate({
      path: "comment",
      populate: {
        path: "userId",
        select: "username profileImg",
      },
    });
    res.send(comment);
  } catch (error) {
    res.send("err");
    console.log(error);
  }
};

module.exports = { comment, comments };
