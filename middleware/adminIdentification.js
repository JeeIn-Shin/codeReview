const jwt = require('jsonwebtoken');

module.exports = {
    async isAdmin(req, res, next)  {
        let decodedToken = jwt.verify(req.cookies.accessToken, process.env.secret);
        
        if(decodedToken.isAdmin === 0) {
            res.status(403).json({ message : "Forbidden" });
        }
    }
}