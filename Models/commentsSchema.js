const { Schema, mongoose } = require("mongoose");

const commentSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "users" },
    comment: { type: String, required: true },
    postId: { type: mongoose.Types.ObjectId, ref: "posts" },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
