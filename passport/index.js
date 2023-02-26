const local = require('./local');
const admin = require('../models/admin');
const passport = require('passport');

module.exports = () => {
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        admin.getAdminById(id)
            .then((user) => {
                return done(null, user)
            })
            .catch((err) => done(err));
    });

    local();
};