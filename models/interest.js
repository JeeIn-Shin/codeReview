const sql = require("./db.js");

const Interest = function (interest) {
    this.user_studentId = interest.user_studentId;
    this.team = interest.team;
    this.personal = interest.personal;
};


Interest.updateById = (id, interest, result)=>{
    sql.query('UPDATE set interest SET team = ?, personal = ? WHERE id = ?', 
    [interest.team, interest.personal, id], (err, res)=>{
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

        console.log("update interest: ", {id:id, ... interest});
        result(null, {id:id, ...interest});
    });
};

module.exports = Interest;