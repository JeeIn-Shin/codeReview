const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./middleware');
require('express-session');

router.post('/', isLoggedIn, (req, res, next) => {

    req.logout((err) => {
        if(err)
            return next(err);
        req.session.destroy();
        res.clearCookie();
        res.json("logout success");
    })
});

module.exports = router;