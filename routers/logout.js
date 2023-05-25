const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const client = require('../models/user');
require('express-session');

// http://localhost:8080/logout
router.get('/', auth, async (req, res) => {
  //사용자 정보 확인 후

  //Refresh token 은 DB에서 삭제
  
  //Access token 은 cache에서 삭제
  res.clearCookie();
});

module.exports = router;