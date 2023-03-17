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
            .then((client) => { // { id : "" , password : "" }
                if (client === undefined) {
                    return done(null, false, { message: "Can't find id" });
                }
                else {
                    if (!(bcrypt.compareSync(pwd, client.password)))
                        return done(null, false, { message: 'wrong password' });
                    else    {
                        //로그인 접속 시도한 사람이 일반 사용자와 관리자 구분을 어떻게 해야하지?
                        if(client.IS_ADMIN === 0)
                            return done(null, client, { message: 'user' });
                        else if(client.IS_ADMIN === 1)
                            return document(null, client, { message : 'admin'} )
                    }
 
                }
            })
            .catch((err) => {
                return done(err);
            })
    }))
}