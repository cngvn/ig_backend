const auth = require("../authenticator");
const express = require("express");
const router = express.Router();
const {
  like,
  unlike,
  checkLikeStatus,
} = require("../Controller/likeController");

router.post("/like", auth, like);
router.delete("/like", auth, unlike);
router.post("/check-like", auth, checkLikeStatus);

module.exports = router;
