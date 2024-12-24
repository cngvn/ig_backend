const { Schema, mongoose } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  profileImg: { type: String },
  followers: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  following: [{ type: mongoose.Types.ObjectId, ref: "users" }],
  posts: [{ type: mongoose.Types.ObjectId, ref: "posts" }],
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
