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
    
        // setLanguage : function (inputData, result) {
    
        //     let userLanguageInfo = Object.values(inputData);
        
        //     DB.getConnection((err, connection) => {
        //         if(!err)    {
        //             let sql =  `INSERT INTO LANGUAGE_TB VALUES ( ? )`;
    
        //             connection.query(sql, [userLanguageInfo], (err, res) => {
        //                 connection.release();
    
        //                 if(err) {
        //                     console.log("sql error " + err);
        //                     result(null, err);
        //                     return ;
        //                 }
    
        //                 result(null, res);
        //                 return ;
        //             })
        //         }
        //         else    {
        //             console.log("connection error" + err)
        //             throw err;
        //         }
        //     })
        // },
    
        // setActivity : function (inputData, result) {
    
        //     let userActivityInfo = Object.values(inputData);
    
        //     DB.getConnection((err, connection) => {
        //         if(!err)    {
        //             let sql =  `INSERT INTO ACTIVITY VALUES ( ? )`;
    
        //             connection.query(sql, [userActivityInfo], (err, res) => {
        //                 connection.release();
    
        //                 if(err) {
        //                     console.log("sql error " + err);
        //                     result(null, err);
        //                     return ;
        //                 }
    
        //                 result(null, res);
        //                 return ;
        //             })
        //         }
        //         else    {
        //             console.log("connection error" + err)
        //             throw err;
        //         }
        //     })
        // }
    },

    //로그인
    signIn : {
        // setLanguage : function (inputData, result) {
        //     let userLanguageInfo = Object.values(inputData);
        
        //     DB.getConnection((err, connection) => {
        //         if(!err)    {
        //             let sql =  `INSERT INTO LANGUAGE_TB VALUES ( ? )`;
    
        //             connection.query(sql, [userLanguageInfo], (err, res) => {
        //                 connection.release();
    
        //                 if(err) {
        //                     console.log("sql error " + err);
        //                     result(null, err);
        //                     return ;
        //                 }
    
        //                 result(null, res);
        //                 return ;
        //             })
        //         }
        //         else    {
        //             console.log("connection error" + err)
        //             throw err;
        //         }
        //     })
        // },
        
        // setActivity : function (inputData, result) {
    
        //     let userActivityInfo = Object.values(inputData);
    
        //     DB.getConnection((err, connection) => {
        //         if(!err)    {
        //             let sql =  `INSERT INTO ACTIVITY VALUES ( ? )`;
    
        //             connection.query(sql, [userActivityInfo], (err, res) => {
        //                 connection.release();
    
        //                 if(err) {
        //                     console.log("sql error " + err);
        //                     result(null, err);
        //                     return ;
        //                 }
    
        //                 result(null, res);
        //                 return ;
        //             })
        //         }
        //         else    {
        //             console.log("connection error" + err)
        //             throw err;
        //         }
        //     })
        // }
        

        /** language, activity 설정이 끝났다면 **/
        updateIfUserSet : function (result) {

        },
    },
}



module.exports = USER;