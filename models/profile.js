const db = require("../config/database.js");
const setProfileImage = require("../others/setProfileImage");

const profile = {
    //사용자 정보 불러오기
    getByLoginInfo : (id) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(!err) {
                    
                    let sql = `SELECT GITHUB, NICKNAME, PROFILE_IMG FROM USER_TB 
                               WHERE ID_PK like ${id}`;
        
                    connection.query(sql, (err, res) => {
                        connection.release();
        
                        if(err) {
                            console.log("error " + err);
                            reject(err);
                        }
                        resolve(res);
                    })
                }
                else    {
                    console.error();
                    throw err;
                }
            })
        })

    }, 

    //프로필 이미지, 닉네임, 이메일, 깃허브 주소 변경
    //이메일 변경을 따로 두는게 맞을까?
    //대부분은 이메일 변경을 따로 두는구나ㅇㅋ
    updateInfo : (id, updateData) => {
        
        return new Promise((resolve, reject) => {
            let data = Object.values(updateData);
            let imgData = setProfileImage(data[0]);
            data[0] = imgData;
        
            db.getConnection(function(err, connection) {
                
                if(!err) {
                    let sql = `UPDATE USER_TB SET
                               PROFILE_IMG = ?, NICKNAME = ?, GITHUB = ?
                               WHERE student_id LIKE ${id}`;                
                        
                    connection.query(sql, data, (err, res) => {
                        connection.release();
        
                        if(err) {
                            console.log("error " + err);
                            reject(err);
                        }
                        resolve(res);
                    })
                }
                else    {
                    console.error(err);
                    throw err;
                }
            })
        })

    },

    //사용자 비밀번호 변경
    //메일링 서비스 연동
    //나중에 구현
    updatePassword : () => {

    },

    updateEmail : () => {

    },

    /**  프로그래밍 언어 관련 정보 불러오기 */
    getUserLanguage : (id) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(!err) {
                    
                    let sql = `SELECT C, CPLUS, CSHARP, JAVA, KOTLIN, SWIFT, PYTHON, GO, JAVASCRIPT, RUST, RUBY
                               FROM LANGUAGE_TB 
                               WHERE ID_PK like ${id}`;
        
                    connection.query(sql, (err, res) => {
                        connection.release();
        
                        if(err) {
                            console.log("query error " + err);
                            reject(err);
                        }
                        resolve(res);
                    })
                }
                else    {
                    console.error("connection error " + err);
                    throw err;
                }
            })
        })

    },

    /** 프로그래밍 언어 관련 정보 수정하기 */ 
    updateLanguage : (id, data) => {
        return new Promise((resolve, reject) => {
            let updateData = Object.values(data);
    
            db.getConnection(function(err, connection) {
                
                if(!err) {
                    let SQL = `UPDATE LANGUAGE_TB SET
                               C = ?, CPLUS = ?, CSHARP = ?, JAVA = ?, 
                               KOTLIN = ?, SWIFT = ?, PYTHON = ?, GO = ? 
                               JAVASCRIPT = ?, RUST = ?, RUBY = ?
                               WHERE ID_PK LIKE ${id}`;                
                        
                    connection.query(SQL, [updateData], (err, res) => {
                        connection.release();
        
                        if(err) {
                            console.log("error " + err);
                            reject(err);
                        }
                        resolve(res);
                    })
                }
                else    {
                    console.error(err);
                    throw err;
                }
            })
        })

    },

    /** 관심 활동 관련 정보 불러오기 */
    getUserActivity : (id) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(!err) {
                    
                    let sql = `SELECT CODEREVIEW, REFACTORING, QA
                               FROM ACTIVITY_TB 
                               WHERE ID_PK like ${id}`;
        
                    connection.query(sql, (err, res) => {
                        connection.release();
        
                        if(err) {
                            console.log("query error " + err);
                            reject(err);
                        }
                        resolve(res);
                    })
                }
                else    {
                    console.error("connection error " + err);
                    throw err;
                }
            })
        })

    },

    /** 관심 활동 관련 정보 수정하기 */
    updateActivity : (id, data) => {

        return new Promise((resolve, reject) => {
            let updateData = Object.values(data);
    
            db.getConnection(function(err, connection) {
                
                if(!err) {
                    let sql = `UPDATE LANGUAGE_TB SET
                               CODEREVIEW = ?, REFACTORING = ?, QA = ?
                               WHERE student_id LIKE ${id}`;                
                        
                    connection.query(sql, [updateData], (err, res) => {
                        connection.release();
        
                        if(err) {
                            console.log("query error " + err);
                            reject(err);
                        }
                        resolve(res);
                    })
                }
                else    {
                    console.error("connection error " + err);
                    throw err;
                }
            }) 
        })
    }
}

module.exports = profile;