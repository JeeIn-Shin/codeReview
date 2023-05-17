const jwt = require('jsonwebtoken');

//유효기간이 만료된 코드에 대해서 처리해줌
module.exports = {
    verifyToken(token)  {
        try {
            return jwt.verify(token, process.env.secret);
        }
        catch(err)  {
            if(err.name === 'TokenExpiredError')
                return null
        }
    }
}