const jwt = require('jsonwebtoken');
const db = require('../config/database');
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
    },

    getTokens: (access) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(!err)    {
                    let sql = `SELECT refresh, access FROM token_tb WHERE access LIKE '${access}'`;

                    connection.query(sql, (err, res) => {
                        connection.release();
                        
                        if(err) {
                            console.log("sql error " + err);
                            reject(err);
                        }
                        resolve(res);
                    })
                }
                else    {
                    console.log("connection error" + err);
                    throw err;
                }
            })
        })
    }
}