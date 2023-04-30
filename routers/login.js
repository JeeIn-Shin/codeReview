const express = require('express');
const router = express.Router();
const passport = require('passport');
const handleResponse = require('../others/handleResponse');
const jwt = require('jsonwebtoken');

// http://localhost:8080/login
router.route('/')
.get((req, res) => {
    res.render('login/login');
})
.post((req, res, next) => {
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
            let token = jwt.sign(
                { id: user.id },
                process.env.secret
            );
            res.json({token});
            //res.render('메인페이지', { token });
        });
    }) (req, res, next);
});

module.exports = router;