const sql = require("./db.js");

const Language = function(laungage) {
    this.user_studentId = laungage.user_studentId;
    this.advanced1 = laungage.advanced1;
    this.advanced2 = laungage.advanced2;
    this.advanced3 = laungage.advanced3;
    this.novice1 = laungage.novice1;
    this.novice2 = laungage.novice2;
    this.novice3 = laungage.novice3;
    this.intermediate1 = laungage.intermediate1;
    this.intermediate2 = laungage.intermediate2;
};

Language.updateById = (id, language, result)=>{
    sql.query('UPDATE `set language` SET advanced1 = ?, advanced2 = ?, advanced3 = ?, novice1 = ?, novice2 = ?, novice3 = ?, intermediate1 = ?, intermediate2 = ? WHERE `user_student id` = ?', 
    [language.advanced1, language.advanced2, language.advanced3, language.novice1, language.novice2, language.novice3, language.intermediate1, language.intermediate2, id], (err, res)=>{
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

        console.log("update language: ", {id:id, ...language});
        result(null, {id:id, ...language});
    });
};

module.exports = Language;