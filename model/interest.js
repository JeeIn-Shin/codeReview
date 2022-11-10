const sql = require("../config/database.js");

const Interest = function (Interest_setting) {
    this.studentID = Interest_setting.studentID;
    this.codeReview = Interest_setting.codeReview;
    this.refactoring = Interest_setting.refactoring;
    this.QA = Interest_setting.QA;
    this.implementation = Interest_setting.implementation;
    this.design = Interest_setting.design;
};

//회원가입시 기본설정으로 자동기입됨
Interest.create = (User_Interest_setting, result) => {
    sql.query("INSERT INTO user SET ?", User_Interest_setting, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created user_Interest_steeing: ", { id: res.insertId, ...User_Interest_setting });
        result(null, { id: res.insertId, ...User_Interest_setting });
    });
};

Interest.getInterest_specific_user = (studentID, result) =>{
    sql.query(`SELECT * FROM user WHERE user_student_id likes '${studentID}'`, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("user_Interest: ", res);
        result(null, res);
    });
};

module.exports = Interest;