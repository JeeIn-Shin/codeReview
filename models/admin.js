const db = require('../config/database');

const admin = {
    getAdminById : (id) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(!err)    {
                    let sql = `SELECT ADMIN_ID, ADMIN_PASSWORD, ADMIN, NAME FROM ADMIN_TB
                               WHERE ADMIN LIKE '${id}`;
    
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