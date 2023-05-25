const express = require("express");
const router = express.Router();
const guestbook = require("../models/guestbook");
const client = require("../models/user");
const { checkTokens } = require("../middleware/auth");
const jwt = require("jsonwebtoken");

// 후기를 작성하는 사람 != 작성된 후기를 보는 사람

// 작성된 후기 보러가기 - 리뷰어만
// http://localhost:8080/guestbook
router.get("/", checkTokens, async (req, res) => {
  let AT = req.headers.authorization.split("Bearer ")[1];
  let user = jwt.decode(AT, process.env.secret);
  let reviewer = await client.signIn.getUserPKById(user.id);

  let needReviewAfter = await guestbook.getComment(reviewer);

  res.json(needReviewAfter);
});

// 후기 작성하러가기 - 리뷰이만
// http://localhost:8080/guestbook/?reviewer=
router.post("/", checkTokens, async (req, res) => {
  let AT = req.headers.authorization.split("Bearer ")[1];
  let user = jwt.decode(AT, process.env.secret);
  //작성하는 사람
  let reviewee = await client.signIn.getUserPKById(user.id);

  //작성 대상
  let reviewer = Object.values(req.query);

  let commentData = {
    COMMENT: req.body.comment,
    DATE: new Date().toLocaleDateString(),
    REVIEWEE_FK: reviewee,
    REVIEWER_FK: reviewer,
  };

  let needReviewAfter = await guestbook.setComment(commentData);

  res.json(needReviewAfter);
});

module.exports = router;
