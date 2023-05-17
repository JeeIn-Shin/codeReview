const verifyToken = require("../util/jwt");

module.exports = {
    async checkTokens(req, res, next) {
    	  /**
         * access token 자체가 없는 경우엔 에러(401)를 반환
         * 클라이언트측에선 401을 응답받으면 로그인 페이지로 이동시킴
         */
        if (req.cookies.access === undefined) throw Error('API 사용 권한이 없습니다.'); 
        
        const accessToken = verifyToken(req.cookies.access);
        const refreshToken = verifyToken(req.cookies.refresh); // *실제로는 DB 조회
        
        if (accessToken === null) {
            if (refreshToken === undefined) { // case1: access token과 refresh token 모두가 만료된 경우
                throw Error('API 사용 권한이 없습니다.');
            } else { // case2: access token은 만료됐지만, refresh token은 유효한 경우
                /**
                 *  DB를 조회해서 payload에 담을 값들을 가져오는 로직
                 */
                const newAccessToken = jwt.sign({ userId, userName },
                    process.env.JWT_SECRET, {
                    expiresIn: '1h',
                    issuer: 'cotak'
                });
                res.cookie('access', newAccessToken);
                req.cookies.access = newAccessToken;
                next();
            }
        } else {
            if (refreshToken === undefined) { // case3: access token은 유효하지만, refresh token은 만료된 경우
                const newRefreshToken = jwt.sign({},
                    process.env.JWT_SECRET, {
                    expiresIn: '14d',
                    issuer: 'cotak'
                });
                /**
                 * DB에 새로 발급된 refresh token 삽입하는 로직 (login과 유사)
                 */
                res.cookie('refresh', newRefreshToken);
                req.cookies.refresh = newRefreshToken;
                next();
            } else { // case4: accesss token과 refresh token 모두가 유효한 경우
                next();
            }
        }
    },
}