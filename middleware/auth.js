const jwt = require('jsonwebtoken');
const client = require('../models/user');
const { verifyToken, getTokens } = require("../util/jwt");
require('cookie-parser');

module.exports = {
    async checkTokens(req, res, next) {
    	/**
         * access token 자체가 없는 경우엔 에러(401)를 반환
         * 클라이언트측에선 401을 응답받으면 로그인 페이지로 이동시킴
         */

        if (req.cookies.accessToken === undefined)  {
            res.status(401).json({ message : "Theres is No access token"});
        }
        //클라에서 넘어온 accesstoken이 진짜 서버단에서 발급해준 token이 맞는지(DB에 저장되어 있는지) 확인해주고,
        let Tokens = await getTokens(req.cookies.accessToken);

        if(Tokens.length === 0)
            res.status(500).json({ message : "Internal Server Error" });
        
        const accessToken = verifyToken(Tokens[0].access);
        const refreshToken = verifyToken(Tokens[0].refresh);

        if (accessToken.length === 0) {
            if (refreshToken.length === 0) { // case1: access token과 refresh token 모두가 만료된 경우
                throw Error('API 사용 권한이 없습니다.');
            } else { // case2: access token은 만료됐지만, refresh token은 유효한 경우
                /**
                 *  DB를 조회해서 payload에 담을 값들을 가져오는 로직
                 */
                let pk = await client.signIn.getUserPKByRefreshToken(Tokens[0].refresh);

                let userInfo = await client.signIn.getUserByPK(pk.USER_TB_ID_PK);
                
                let id = userInfo.ID;
                let nickname = userInfo.NICKNAME;
                let isAdmin = userInfo.IS_ADMIN;

                const newAccessToken = jwt.sign({ id, nickname, isAdmin },
                    process.env.secret, {
                    expiresIn: '1h',
                    issuer: 'cotak'
                });
                res.cookie('access', newAccessToken);

                await client.signIn.updateTokens(pk.USER_TB_ID_PK, [Tokens[0].refresh, newAccessToken]);
                res.status(500).json({ message : "access token is expires" });
            }
        } else {
        // case3: access token은 유효하지만, refresh token은 만료된 경우
            if (refreshToken.length === 0) {
                const newRefreshToken = jwt.sign({},
                    process.env.secret, {
                    expiresIn: '14d',
                    issuer: 'cotak'
                });
                /**
                 * DB에 새로 발급된 refresh token 삽입하는 로직 (login과 유사)
                 */
                let pk = await client.signIn.getUserPKByAccessToken(Tokens[0].access);

                await client.signIn.updateTokens(pk.USER_TB_ID_PK, [newRefreshToken, Tokens[0].access]);
                res.status(500).json({ message : "refresh token is expires" });
            } else { // case4: accesss token과 refresh token 모두가 유효한 경우
                next();
            }
        }
    },
}