const sql = require("../cofing/database.js");

const user = function (user_setting) {
    this.studentID = user_setting.studentID;
    this.password = user_setting.password;
    this.name = user_setting.name;
    this.email = user_setting.email;
    this.nickname = user_setting.nickname;
};

//사용자 회원가입
//student id, email, nickname UQ
user.create = (newUser, result) => {
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

user.getAll = result =>{
    sql.query('SELECT * FROM user', (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("user: ", res);
        result(null, res);
    });
};



module.exports = user;