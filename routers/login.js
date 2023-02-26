const express = require('express');
const router = express.Router();
const passport = require('passport');
const handleResponse = require('../others/handleResponse');
const { isNotLoggedIn } = require('./middleware');

router.route('/')
.get((req, res) => {
    res.render('signin');
})
.post(isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);

        if (!user)
            return handleResponse(res, 404, info);

        return req.logIn(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            // 어떤 화면으로 돌아가게하는게 좋을까
            res.redirect('back');
        });
    }) (req, res, next);
});


module.exports = router;