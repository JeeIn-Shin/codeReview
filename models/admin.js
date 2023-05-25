const db = require('../config/database');

const admin = {
    getAdminById : (id) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(!err)    {
                    let sql = `SELECT ID, PASSWORD, NICKNAME FROM USER_TB
                               WHERE ID LIKE '${id}'
                               AND IS_ADMIN LIKE 1`;
    
                    connection.query(sql, [userInfo], (err, data) => {
                        connection.release();
    
                        if(err) {
                            console.log("sql error " + err);
                            reject(err)
                        }
                        resolve(data);
                    })
                }
                else    {
                    console.log("connection error" + err)
                    throw err;
                }
            })
        })
    },
}

module.exports = admin;