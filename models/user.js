const db = require('../config/database');


const user = {
    
    //회원가입단
    signUp : {
        setPersonalInformation : (inputData) => {

            return new Promise((resolve, reject) => {
                let userInfo = Object.values(inputData);
    
                db.getConnection((err, connection) => {
                    if(!err)    {
                        let sql = `INSERT INTO USER_TB VALUES ( ID_PK, ? )`;
        
                        connection.query(sql, [userInfo], (err, res) => {
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
    },

    //로그인
    signIn : {
        getUserById : (id) => {
    
            return new Promise((resolve, reject) => {
                db.getConnection((err, connection) => {
                    if(!err)    {
                        let sql = ``;
        
                        connection.query(sql, [userInfo], (err, res) => {
                            connection.release();
        
                            if(err) {
                                console.log("sql error " + err);
                                reject(err);
                            }
                            resolve(res);
                        })
                    }
                    else    {
                        console.log("connection error" + err)
                        throw err;
                    }
                })
            })

        },
    },
}



module.exports = user;