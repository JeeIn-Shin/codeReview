const express = require('express');
const router = express.Router();
const guestBook = require('../models/guestbook');
const { checkTokens } = require('../middleware/auth');
const jwt = require('jsonwebtoken');


// http://localhost:8080/reviews
router.get('/', checkTokens, async(req, res) => {
    let AT =  req.headers.authorization.split('Bearer ')[1];
    let user = jwt.decode(AT, process.env.secret);
    
    /// ?????
    let reviewerList = await guestBook.getCodereviewActInfo(user.id);

    res.json(reviewerList);
})

module.exports = router;