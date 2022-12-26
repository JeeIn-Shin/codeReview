const db = require("../config/database.js");
const sql = require("../config/database.js");

const Interest = function (Interest_setting) {
    this.studentID = Interest_setting.studentID;
    this.codeReview = Interest_setting.codeReview;
    this.refactoring = Interest_setting.refactoring;
    this.QA = Interest_setting.QA;
    this.implementation = Interest_setting.implementation;
    this.design = Interest_setting.design;
};

//첫 회원가입시 초기화 
Interest.initial = (adminID, init, result) => {
    
    let setting_value = Object.values(init);

    db.getConnection(function(err, connection) {
        
        if(!err)    {
            let SQL = `INSERT INTO set_interest VALUES ( "${adminID}", ? )`
            connection.query(SQL, [setting_value], (err, res) => {
                connection.release();

                if(err) {
                    console.log("error" + err);
                    result(null, err);
                    return ;
                }

                result(null, res);
                return ;
            })
        }
        else    {
            console.log("Interest init err" + err);
            throw err;
        }
    })
}

//관심 분야 수정
Interest.set = (adminID, input_values, result) => {

    let setting_value = Object.values(input_values);

    db.getConnection(function(err, connection) {
        
        if(!err) {
            
            let SQL = `UPDATE set_interset SET code_revie = ? , refactoring = ?, QA = ?, implementation = ?, design = ?
                       WHERE user_student_id LIKE ${adminID}`;

            connection.query(SQL, setting_value, (err, res) => {
                connection.release();

                if(err) {
                    console.log("error", + err);
                    result(null, err);
                    return ;
                }
                
                result(null, res);
                return ;
            })
        }
        else    {
            console.log("interest set error ", + err);
            throw err;
        }
    })
}

//관심분야 확인
Interest.getbyID = (adminID, result) => {
    
    db.getConnection(function(err, connection) {
        
        if(!err)    {
            let SQL = `SELECT code_revie, refactoring, QA, implementation, design FROM set_interest
                       WHERE user_student_id LIKE ${adminID}`;

            connection.query(SQL, (err, res) => {
                connection.release();

                if(err) {
                    console.log("error" + err);
                    result(null, err);
                    return ;
                }
                
                result(null, res);
                return ;
            })
        }
        else    {
            console.log("interest getbyID error " + err);
            throw err;
        }
    })
}

module.exports = Interest;