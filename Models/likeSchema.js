const { Schema, mongoose } = require("mongoose");

const likeSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "users" },
  post: { type: mongoose.Types.ObjectId, ref: "posts" },
});

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;
