const DB = require('../config/database');


const USER = {
    
    //회원가입단
    signUp : {
        setPersonalInformation : function (inputData, result)    {

            let userInfo = Object.values(inputData);
    
            DB.getConnection((err, connection) => {
                if(!err)    {
                    let sql = `INSERT INTO USER_TB VALUES ( ? )`;
    
                    connection.query(sql, [userInfo], (err, res) => {
                        connection.release();
    
                        if(err) {
                            console.log("sql error " + err);
                            result(null, err);
                            return ;
                        }
    
                        result(null, res);
                        return ;
                    })
                }
                else    {
                    console.log("connection error" + err)
                    throw err;
                }
            })
        },
    },

    //로그인
    signIn : {
        
    },
}



module.exports = USER;