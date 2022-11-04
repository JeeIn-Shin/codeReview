const sql = require("../cofing/database.js");

const Language = function (language_setting) {
    this.studentID = language_setting.studentID;
    this.advanced1 = language_setting.advanced1;
    this.advanced2 = language_setting.advanced2;
    this.advanced3 = language_setting.advanced3;
    this.intermediate1 = language_setting.intermediate1;
    this.intermediate2 = language_setting.intermediate2;
    this.novice1 = language_setting.novice1;
    this.novice2 = language_setting.novice2;
    this.novice3 = language_setting.novice3;
};

//회원가입시 기본설정으로 자동기입됨
Language.create = (User_language_setting, result) => {
    sql.query("INSERT INTO user SET ?", User_language_setting, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created user_language_steeing: ", { id: res.insertId, ...User_language_setting });
        result(null, { id: res.insertId, ...User_language_setting });
    });
};

Language.getLanguage_specific_user = (studentID, result) =>{
    sql.query(`SELECT * FROM user WHERE user_student_id likes '${studentID}'`, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("user_language: ", res);
        result(null, res);
    });
};

module.exports = Language;