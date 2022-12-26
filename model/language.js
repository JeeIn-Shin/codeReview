const db = require("../config/database.js");
const sql = require("../config/database.js");

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
//싹 다 0으로?
//일단은 회원가입 구현 XXXXXX
Language.initial = (adminID, init, result) => {

    console.log(adminID);

    let setting_value = Object.values(init);
    console.log(setting_value);
    
    db.getConnection(function(err, connection ) {
        if(!err) {
            // join 어떻게 사용하지?
            let SQL = `INSERT INTO set_language VALUES ( "${adminID}", ? )`;

            connection.query(SQL, [setting_value], (err, res) => {
                connection.release();

                if(err) {
                    console.log("error: ", err);
					result(null, err);
					return ;
                }

                result(null, res);
                return ;
            })
        }
        else    {
            console.error('INITIAL LANGUAGE SQL ERROR ' + err);
            throw err;
        }
    })
}

//개인정보(?) 중, language 업뎃시
Language.set = (adminID, input_values, result) => {
    
    console.log(adminID);
    let setting_value = Object.values(input_values);

    
    db.getConnection(function(err, connection) {
        if(!err) {
            let SQL = `UPDATE set_language SET
                       C = ?, Cplus = ?, Csharp = ?, Java = ?, Kotlin = ?, Swift = ?,
                       Python = ?, Go = ?, JavaScript = ?, Rust = ?, Ruby = ?
                       WHERE user_student_id like ${adminID}`;

            connection.query(SQL, setting_value, (err, res) =>{
                connection.release();
    
                if(err) {
                    console.log("error ", + err);
                    result(null, err);
                    return ;
                }
                
                result(null, res);
                return ;
            })

        }
        else    {
            console.error('UPDATE LANGUAGE SQL ERROR ' + err);
            throw err;
        }
    })
}

//이건 언제쓸려나
//로그인 한 사람이 자신의 개인정보설정 페이지에서 확인할 수 있게끔
//음!
Language.getbyID = (adminID, result) => {

    db.getConnection(function(err, connection) {
        if(!err) {
            let SQL = `SELECT C, Cplus, Csharp, Java, Kotlin, Swift, Python, Go, Javascript, Rust, Ruby FROM set_language 
                       WHERE user_student_id like ${adminID}`

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

        }
    })
}

module.exports = Language;