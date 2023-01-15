const DB = require("../config/database.js");


let setProfileImage = (imageUpdateValue) => {
    switch(imageUpdateValue)  {
        case 0:
            return '../view/img/profile/0.png';
            break;
        case 1:
            return '../view/img/profile/1.png';
            break;
        case 2:
            return '../view/img/profile/2.png';
            break;
        case 3:
            return '../view/img/profile/3.png';
            break;
        case 4:
            return '../view/img/profile/4.png';
            break;
        case 5:
            return '../view/img/profile/5.png';
            break;
        case 6:
            return '../view/img/profile/6.png';
            break;
    }
}

const PROFILE = {
    //사용자 정보 불러오기
    getByLoginInfo : function(id, result) {
        DB.getConnection((err, connection) => {
            if(!err) {
                
                let sql = `SELECT GITHUB, NICKNAME, PROFILE_IMG FROM USER_TB 
                           WHERE ID_PK like ${id}`;
    
                connection.query(sql, (err, res) => {
                    connection.release();
    
                    if(err) {
                        console.log("error " + err);
                        result(null, err);
                        return ;
                    }
                    result(null, res);
                    return ;
                })
            }
            else    {
                console.error();
                throw err;
            }
        })
    }, 

    //프로필 이미지, 닉네임, 이메일, 깃허브 주소 변경
    //이메일 변경을 따로 두는게 맞을까?
    //대부분은 이메일 변경을 따로 두는구나ㅇㅋ
    updateInfo : function(id, updateData, result) {
        
        let data = Object.values(updateData);
        let imgData = setProfileImage(data[0]);
        data[0] = imgData;
    
        DB.getConnection(function(err, connection) {
            
            if(!err) {
                let SQL = `UPDATE USER_TB SET
                           PROFILE_IMG = ?, NICKNAME = ?, GITHUB = ?
                           WHERE student_id LIKE ${id}`;                
                    
                connection.query(SQL, data, (err, res) => {
                    connection.release();
    
                    if(err) {
                        console.log("error " + err);
                        result(null, err);
                        return ;
                    }
                    result(null, res);
                    return ;
                })
            }
            else    {
                console.error(err);
                throw err;
            }
        })
    },

    //사용자 비밀번호 변경
    //메일링 서비스 연동
    //나중에 구현
    updatePassword : function (result)  {

    },

    updateEmail : function (result) {

    },

    /**  프로그래밍 언어 관련 정보 불러오기 */
    getUserLanguage : function(id, result)    {
        DB.getConnection((err, connection) => {
            if(!err) {
                
                let sql = `SELECT C, CPLUS, CSHARP, JAVA, KOTLIN, SWIFT, PYTHON, GO, JAVASCRIPT, RUST, RUBY
                           FROM LANGUAGE_TB 
                           WHERE ID_PK like ${id}`;
    
                connection.query(sql, (err, res) => {
                    connection.release();
    
                    if(err) {
                        console.log("query error " + err);
                        result(null, err);
                        return ;
                    }
                    result(null, res);
                    return ;
                })
            }
            else    {
                console.error("connection error " + err);
                throw err;
            }
        })
    },

    /** 프로그래밍 언어 관련 정보 수정하기 */ 
    updateLanguage : function (id, data, result)    {
        let updateData = Object.values(data);
    
        DB.getConnection(function(err, connection) {
            
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
                        result(null, err);
                        return ;
                    }
                    result(null, res);
                    return ;
                })
            }
            else    {
                console.error(err);
                throw err;
            }
        })
    },

    /** 관심 활동 관련 정보 불러오기 */
    getUserActivity : function(id, result)    {
        DB.getConnection((err, connection) => {
            if(!err) {
                
                let sql = `SELECT CODEREVIEW, REFACTORING, QA
                           FROM ACTIVITY_TB 
                           WHERE ID_PK like ${id}`;
    
                connection.query(sql, (err, res) => {
                    connection.release();
    
                    if(err) {
                        console.log("query error " + err);
                        result(null, err);
                        return ;
                    }
                    result(null, res);
                    return ;
                })
            }
            else    {
                console.error("connection error " + err);
                throw err;
            }
        })
    },

    /** 관심 활동 관련 정보 수정하기 */
    updateActivity : function (id, data, result)    {
        let updateData = Object.values(data);
    
        DB.getConnection(function(err, connection) {
            
            if(!err) {
                let SQL = `UPDATE LANGUAGE_TB SET
                           CODEREVIEW = ?, REFACTORING = ?, QA = ?
                           WHERE student_id LIKE ${id}`;                
                    
                connection.query(SQL, [updateData], (err, res) => {
                    connection.release();
    
                    if(err) {
                        console.log("query error " + err);
                        result(null, err);
                        return ;
                    }
                    result(null, res);
                    return ;
                })
            }
            else    {
                console.error("connection error " + err);
                throw err;
            }
        })        
    }
}

PROFILE.getUserLanguage

module.exports = PROFILE;