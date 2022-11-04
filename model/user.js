const sql = require("../cofing/database.js");

const User = function (user_setting) {
    this.student_id = user_setting.student_id;
    this.password = user_setting.password;
    this.name = user_setting.name;
    this.email = user_setting.email;
    this.nickname = user_setting.nickname;
};

//사용자 회원가입
//student id, email, nickname UQ
User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.get_specific_user = (studentID, result) =>{
    sql.query(`SELECT * FROM user WHERE student_id likes '${studentID}'`, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("user: ", res);
        result(null, res);
    });
};


module.exports = User;