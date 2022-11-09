const sql = require("./db.js");

const UserPW= function(userPW){
    this.studentId = userPW.studentId;
    this.password = userPW.password;
};

UserPW.updateById = (id, userPW, result)=>{
    sql.query('UPDATE user SET password = ? WHERE `student id` = ?', 
    [userPW.password, id], (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.affectedRows ==0){
            // id 결과가 없을 시 
            result({kind: "not_found"}, null);
            return;
        }

        console.log("update password: ", {id:id, ... userPW});
        result(null, {id:id, ...userPW});
    });
};


module.exports = UserPW;