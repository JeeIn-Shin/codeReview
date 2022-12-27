const { getConnection } = require("../config/database.js");
const db = require("../config/database.js");

const User = function (input_user_data) {
    this.student_id = input_user_data.student_id;
    this.password = input_user_data.password;
    this.git_hub = input_user_data.git_hub;
    this.profile_img = input_user_data.profile_img;
};

//사용자 회원가입
//student id, email, nickname UQ
//input_user_data => 사용자로부터 입력받은 객체

//회원가입하고 아무것도 안하면 그냥 기본 이미지인거지
//오 이게 좋은거 같음
User.create = (init, result) => {
    
    let setting_value = Object.values(init);

    db.getConnection((err, connection) => {
        if(!err) {
            let SQL = `INSERT INTO user VALUES ( ?, '../view/img/profile/default.png' )`;
            connection.query(SQL, [setting_value], (err, res) => {
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
};


//해당 사용자의 정보 불러오기
User.findById = (adminID, result) =>{


    db.getConnection((err, connection) => {
        if(!err) {
            
            let SQL = `SELECT git_hub, nickname, profile_img FROM user 
                       WHERE student_id LIKE ${adminID}`;
            
            connection.query(SQL, (err, res) => {
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

};

//사용자의 정보 변경
//프로필 사진 제외

//ㅈㅁ 이거 고민 좀 해보자..
//비밀번호 변경을 따로 둬야하지 않을까?
User.update = (adminID, input_values, result) => {

    let setting_value = Object.values(input_values);

    db.getConnection(function(err, connection) {
        
        if(!err) {
            let SQL = `UPDATE user SET
                       email = ?, nickname = ?, git_hub = ?
                       WHERE user_student_id like ${adminID}`;

            connection.query(SQL, setting_value, (err, res) => {
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
}


//사용자의 프로필 사진 변경
User.update_profile = (adminID, result) => {
    db.getConnection(function(err, connection) {
        if(!err) {

            let SQL = ``;

            connection.query(SQL, (err, res) => {
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
}

//사용자 비밀번호 변경
//근데 암호화 되어있는데 이걸 어떻게?
//메일링 서비스 연동
//나중에 구현
User.update_password = () => {

}

module.exports = User;