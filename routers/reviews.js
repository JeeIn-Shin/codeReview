const express = require("express");
const router = express.Router();
const guestBook = require("../models/guestbook");
const client = require("../models/user");
const { checkTokens } = require("../middleware/auth");
const jwt = require("jsonwebtoken");

// http://localhost:8080/reviews
router.get("/", checkTokens, async (req, res) => {
  let AT = req.headers.authorization.split("Bearer ")[1];
  let user = jwt.decode(AT, process.env.secret);
  let fk = await client.signIn.getUserPKById(user.id);
  /// ?????
  let reviewerList = await guestBook.getCodereviewActInfo(fk);

  res.json(reviewerList);
});

module.exports = router;
