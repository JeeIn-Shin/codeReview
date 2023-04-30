const local = require('.');
const client = require('../models/user');
const passport = require('passport');

module.exports = () => {
    passport.serializeUser((user, done) => {
        return done(null, user);
    });

    passport.deserializeUser((user, done) => {
        client.signIn.getUserById(user.ID)
            .then((user) => {
                return done(null, user)
            })
            .catch((err) => done(err));
    });

    local();
};