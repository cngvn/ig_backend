const { Schema, mongoose } = require("mongoose");

const postSchema = new Schema(
  {
    caption: { type: String, required: true },
    postImg: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    likes: [{ type: mongoose.Types.ObjectId, ref: "users" }],
    comment: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
  },
  { timestamps: true }
);

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
