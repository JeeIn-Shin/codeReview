const db = require("../config/database.js");

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
    db.init().query("INSERT INTO codereview.user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created user: ", { id: res.student_id, ...newUser });
        result(null, { id: res.student_id, ...newUser });
    });
};

User.findById = (student_id, result) =>{

    let search_by_id = `SELECT * FROM user WHERE student_id like ${student_id}`;
    db.init().query((search_by_id), (err, res) => {
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