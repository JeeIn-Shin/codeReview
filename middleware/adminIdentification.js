const jwt = require('jsonwebtoken');

module.exports = {
    async isAdmin(req, res, next)  {
        let AT =  req.headers.authorization.split('Bearer ')[1];
        let decodedToken = jwt.verify(AT, process.env.secret);
        
        if(decodedToken.isAdmin === 0)
            return res.status(403).json({ message : "Forbidden" });
        else
            next();
    }
}