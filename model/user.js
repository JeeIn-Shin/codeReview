const db = require("../config/database.js");

const User = function (input_user_data) {
    this.student_id = input_user_data.student_id;
    this.password = input_user_data.password;
    this.name = input_user_data.name;
    this.email = input_user_data.email;
    this.nickname = input_user_data.nickname;
};

//사용자 회원가입
//student id, email, nickname UQ
//input_user_data => 사용자로부터 입력받은 객체
User.create = (input_user_data, result) => {
    
    let query_create_user = `INSERT INTO user
                            values
                            ('${input_user_data.student_id}', '${input_user_data.password}', '${input_user_data.name}',
                            '${input_user_data.email}', '${input_user_data.nickname}', '${input_user_data.position}')`;
    
    db.init().query(query_create_user, (err, res) => {
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
    
    let query_search_by_id = `SELECT * FROM user WHERE student_id like ${student_id}`;
    
    db.init().query((query_search_by_id), (err, res) => {
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