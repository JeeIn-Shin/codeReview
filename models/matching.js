const DB = require('../config/database');

//매칭의 시작과

//매칭의 마무리를 담당함
const MATCHING = {


    //대기열 등록
    enrollQueue : (data, result) => {

        const queueInfo = Object.values(data)

        DB.getConnection((err, connection) => {
            if(!err)    {
                let sql = `INSERT INTO QUEUE_TB VALUES ( ? )`;
                connection.query(sql, [queueInfo], (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error " + err);
                        result(null, err);
                        return ;
                    }
                    result(null, res);
                    return ;
                })
            }
            else    {
                console.log("mysql connection error " + err);
                throw err;
            }
        })
    },

    //리뷰이라면 추가적으로 정보를 입력해야함
    matchFromReviewee : (result) => {

    },

    //리뷰어들만 우선순위큐를 통해 한명 선택함
    makeMatchingPriorityqueueFromReviwers : (result) => {
        DB.getConnection((err, connection) => {
            if(!err)    {
                let sql = ``;
                connection.query(sql, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error " + err);
                        result(null, err);
                        return ;
                    }
                    result(null, res);
                    return ;
                })
            }
            else    {
                console.log("mysql connection error " + err);
                throw err;
            }
        })
    },


    //매칭 성공시 대기열에서 삭제
    deleteQueue : (result) => {
        DB.getConnection((err, connection) => {
            if(!err)    {
                let sql = `DELETE FROM QUEUE_TB WHERE ID_PK IN (?)`;
                connection.query(sql, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error " + err);
                        result(null, err);
                        return ;
                    }
                    result(null, res);
                    return ;
                })
            }
            else    {
                console.log("mysql connection error " + err);
                throw err;
            }
        })
    }
}

module.exports = MATCHING;