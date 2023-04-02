const express = require('express');
const router = express.Router();
const guestbook = require('../models/guestbook');
const { isNotLoggedIn } = require('./middleware');



module.exports = router;