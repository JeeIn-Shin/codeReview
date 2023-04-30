const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const bcrypt = require('bcrypt');
const client = require('../models/user');

const passportConfig = { usernameField: 'id', passwordField: 'pwd', session: true };

const passportVerify = async (id, pwd, done) => {
  try {
    const user = await client.signIn.getUserById(id);
    console.log("in passport", user);
    if (!user) {
      done(null, false, { message: '존재하지 않는 사용자 입니다.' });
      return;
    }

    const compareResult = await bcrypt.compare(pwd, user.PASSWORD);

    if (compareResult) {
      done(null, user);
      return;
    }

    done(null, false, { reason: '올바르지 않은 비밀번호 입니다.' });
  }
  catch (error) {
    console.error(error);
    done(error);
  }
};

const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.secret,
};

const JWTVerify = async (jwtPayload, done) => {
  try {
    const user = await client.signIn.getUserById(jwtPayload.id);

    console.log("in jwt", user);
    if (user) {
      done(null, user);
      return;
    }

    done(null, false, { reason: '올바르지 않은 인증정보 입니다.' });
  }
  catch (error) {
    console.error(error);
    done(error);
  }
};

module.exports = () => {
  passport.use('local', new LocalStrategy(passportConfig, passportVerify));
  passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify));
};