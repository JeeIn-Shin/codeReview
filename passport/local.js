const client = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

module.exports = () => {
    passport.use(new localStrategy({
        usernameField: 'id',  //req.body.id
        passwordField: 'pwd', //req.body.pwd
        session: true,
        passReqToCallback: false
    }, (id, pwd, done) => {
        client.signIn.getUserById(id)
            .then((user) => {
                if (user === undefined) {
                    return done(null, false, { message: 'Not admin' });
                }
                else {
                    if (!(bcrypt.compareSync(pwd, user.PASSWORD)))
                        return done(null, false, { message: 'wrong password' });
                    else
                        return done(null, user, { message: 'success' });
                }
            })
            .catch((err) => {
                return done(err);
            })
    }))
}