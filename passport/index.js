const local = require('./local');
const user = require('../models/user');
const passport = require('passport');

module.exports = () => {
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        user.signIn.getUserById(id)
            .then((user) => {
                return done(null, user)
            })
            .catch((err) => done(err));
    });

    local();
};