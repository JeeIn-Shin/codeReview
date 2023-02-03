const Promise = require('bluebird');
const { resolve } = require('path');
const { getConnection } = require('../config/database');
const DB = require('../config/database');
const THINGABOUTSUBQUERY = require('../others/aboutSql');

//매칭의 시작과

//매칭의 마무리를 담당함
const MATCHING = {

    //대기열 등록
    registerQueue : (data, result) => {

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

    //대기열 등록 후 일정 등록//
    setPlan : (data, result) => {

        const scheduleInfo = Object.values(data)

        DB.getConnection((err, connection) => {
            if(!err)    {
                let sql = `INSERT INTO SCHEDULE_TB VALUES ( ? )`;
                connection.query(sql, [scheduleInfo], (err, res) => {
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

    //두개의 테이블에 값을 동시에 넣을 수 있나???
    //찾아봐야함
    //그리고 그게 좋은 방법인가??? 도 고민해봐야함
    setPlanAndPrefer : (data, result) => {

        const scheduleInfo = Object.values(data)

        DB.getConnection((err, connection) => {
            if(!err)    {
                let sql = ``;
                connection.query(sql, [scheduleInfo], (err, res) => {
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

    //일정 수정 --리뷰어
    updatePlan : (id, data, result) => {

        const scheduleInfo = Object.values(data)

        DB.getConnection((err, connection) => {
            if(!err)    {
                let sql = `UPDATE SCHEDULE_TB SET MON = ?, TUE = ?, WED = ?, THURS = ?, FRI = ?
                           WHERE ID_PK LIKE ${id}`;
                connection.query(sql, scheduleInfo, (err, res) => {
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

    //일정 및 선택 부분 수정 --리뷰이
    updatePlanAndPrefer : (id, data, result) => {

        const scheduleInfo = Object.values(data)

        DB.getConnection((err, connection) => {
            if(!err)    {
                let sql = `UPDATE SCHEDULE_TB
                           INNER JOIN REVIEWEE_PREFER_TB
                           ON SCHEDULE_TB.ID_PK = REVIEWEE_PREFER_TB.REVIEWEE_ID_FK
                           SET
                           SCHEDULE_TB.MON = ?, SCHEDULE_TB.TUE = ?, SCHEDULE_TB.WED = ?, SCHEDULE_TB.THURS = ?, SCHEDULE_TB.FRI = ?,
                           REVIEWEE_PREFER_TB.LANGUAGE = ?, REVIEWEE_PREFER_TB.ACTIVITY = ?
                           WHERE SCHEDULE_TB.ID_PK LIKE ${id};`;
                
                    connection.query(sql, scheduleInfo, (err, res) => {
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

    //대기열에서 리뷰어로 신청한 사람들만 가져옴
    getRevieweesInfo : () => {

        return new Promise((resolve, reject) => {

            DB.getConnection((err, connection) => {
                if (!err) {
                    let sql = `SELECT
                    QUEUE_TB.ID_PK, QUEUE_TB.CREATEDAT, QUEUE_TB.POSITION,
                    REVIEWEE_PREFER_TB.LANGUAGE, REVIEWEE_PREFER_TB.ACTIVITY,
                    SCHEDULE_TB.MON, SCHEDULE_TB.TUE, SCHEDULE_TB.WED, SCHEDULE_TB.THURS, SCHEDULE_TB.FRI
                    FROM QUEUE_TB
                    INNER JOIN  REVIEWEE_PREFER_TB
                    ON QUEUE_TB.ID_PK = REVIEWEE_PREFER_TB.REVIEWEE_ID_FK
                    INNER JOIN SCHEDULE_TB
                    ON REVIEWEE_PREFER_TB.REVIEWEE_ID_FK = SCHEDULE_TB.ID_PK
                    WHERE QUEUE_TB.POSITION = 1`;

                    connection.query(sql, (err, data) => {
                        connection.release();

                        if(err) {
                            reject(err);
                        }
                        else    {
                            resolve(data);
                        }
                    })
                }
                else    {
                    console.log("mysql connection error" + err);
                }
            });
        })
        // DB.getConnection((err, connection) => {
        //     if(!err)    {
        //         // ????????????????????????????????????
        //         let sql = `SELECT
        //                    QUEUE_TB.ID_PK, QUEUE_TB.CREATEDAT, QUEUE_TB.POSITION,
        //                    REVIEWEE_PREFER_TB.LANGUAGE, REVIEWEE_PREFER_TB.ACTIVITY,
        //                    SCHEDULE_TB.MON, SCHEDULE_TB.TUE, SCHEDULE_TB.WED, SCHEDULE_TB.THURS, SCHEDULE_TB.FRI
        //                    FROM QUEUE_TB
        //                    INNER JOIN  REVIEWEE_PREFER_TB
        //                    ON QUEUE_TB.ID_PK = REVIEWEE_PREFER_TB.REVIEWEE_ID_FK
        //                    INNER JOIN SCHEDULE_TB
        //                    ON REVIEWEE_PREFER_TB.REVIEWEE_ID_FK = SCHEDULE_TB.ID_PK
        //                    WHERE QUEUE_TB.POSITION = 1`;
                           
        //         return new Promise((resolve, reject) => {
        //             connection.query(sql, (err, result) => {
        //                 if(err)
        //                     data = reject(new Error());
        //                 else
        //                     data = resolve(result);
        //             });
        //         })
        //     }
        //     else    {
        //         console.log("mysql connection error " + err);
        //         throw err;
        //     }
        // })
        // console.log(data);
    },

    //리뷰이들의 입력값을 가지고 있는 리뷰어들의 정보로 대기열을 구성해야함
    getReviewersInfo : (data) => {

        let revieweesInfo = data;

        return new Promise((resolve, reject) => {
            DB.getConnection((err, connection) => {
                if(!err)    {
                    let mainQuery = `SELECT  LANGUAGE_TB.ID_PK, LANGUAGE_TB.${Object.values(revieweesInfo)[3]}, ACTIVITY_TB.${Object.values(revieweesInfo)[4]}, QUEUE_TB.CREATEDAT FROM  LANGUAGE_TB 
                                     INNER JOIN ACTIVITY_TB 
                                     ON LANGUAGE_TB.ID_PK = ACTIVITY_TB.ID_PK
                                     INNER JOIN QUEUE_TB
                                     ON ACTIVITY_TB.ID_PK = QUEUE_TB.ID_PK
                                     INNER JOIN SCHEDULE_TB
                                     ON QUEUE_TB.ID_PK = SCHEDULE_TB.ID_PK
                                     WHERE QUEUE_TB.POSITION = 0`;
                    
                    //WHERE SCHEDULE_TB.${weekday} REGEXP '${string} OR ~
                    //이 부분은 리뷰이로부터 받아오는 정보로 구성되어야하거든?
                    //어허,,,
                    //findSameTimeZone 구현해야함
                    let subQuery = THINGABOUTSUBQUERY.findSameTimeZone(revieweesInfo);
                    
                    //나중에 테스트
                    let sql = [[mainQuery], [subQuery]].join(' AND (') + ')';
                        
                    connection.query(sql, (err, res) => {
                        connection.release();
                        
                        if(err) {
                            reject(err);
                        }
                        else    {
                            resolve(res);
                        }
                    })
                }
                else
                    console.log("mysql connection error" + err);
            })
        })
        // let revieweesInfo = data;
        // DB.getConnection((err, connection) => {
        //     if(!err)    {
        //         let mainQuery = `SELECT  LANGUAGE_TB.ID_PK, LANGUAGE_TB.JAVA, ACTIVITY_TB.CODEREVIEW, QUEUE_TB.CREATEDAT FROM  LANGUAGE_TB 
        //                          INNER JOIN ACTIVITY_TB 
        //                          ON LANGUAGE_TB.ID_PK = ACTIVITY_TB.ID_PK
        //                          INNER JOIN QUEUE_TB
        //                          ON ACTIVITY_TB.ID_PK = QUEUE_TB.ID_PK
        //                          INNER JOIN SCHEDULE_TB
        //                          ON QUEUE_TB.ID_PK = SCHEDULE_TB.ID_PK
        //                          WHERE QUEUE_TB.POSITION = 0
        //                          AND SCHEDULE_TB.WED REGEXP ('7')`;
                
        //         //WHERE SCHEDULE_TB.${weekday} REGEXP '${string} OR ~
        //         //이 부분은 리뷰이로부터 받아오는 정보로 구성되어야하거든?
        //         //어허,,,
        //         //
        //         let subQuery = SUBQUERY.findSameTimeZone(revieweesInfo);
                
        //         //나중에 테스트
        //         let sql = [[mainQuery], [subQuery]].join();
                    
        //         connection.query(mainQuery, (err, res) => {
        //             connection.release();
                    
        //             if(err) {
        //                 return err;
        //             }
        //             return res;
        //         })
        //     }
        //     else    {
        //         console.log("mysql connection error " + err);
        //         throw err;
        //     }
        // })
    },

    //대기열을 구성해서 우선순위를 뽑았으면,
    //리뷰이랑 리뷰어의 시간대가 언제 맞는지를 알려줘야함
    //이건 CODEREVIEW_ACT_INFO_TB 에서 저장 하는게 좋을거 같다.
    setReviewActInfo : (data, result) => {

        let matchingData = Object.values(data);

        DB.getConnection((err, connection) => {
            if(!err)    {
                let sql = `INSERT INTO CODEREVIEW_ACT_INFO_TB VALUES ( ? )`;
                connection.query(sql, [matchingData], (err, res) => {
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

    //매칭 성공시 대기열에서 삭제되는데,
    //최소 한 사람, 최대 두 사람이 동시에 삭제되어야하고
    //최소 2, 최대 3 테이블에서 데이터가 삭제되어야함
    //이건 어떻게 구현하지?
    deleteQueue : (result) => {
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
    }
}

module.exports = MATCHING;