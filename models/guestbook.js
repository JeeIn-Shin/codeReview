const db = require('../config/database');

const guestBook = {
    getCodereviewActInfo: (reviewee_fk) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if (!err) {
                    let sql =  `SELECT
                                    REVIEWER_FK,
                                FROM
                                    CODEREVIEW_ACT_INFO_TB
                                WHERE
                                    STATE LIKE 0
                                    AND REVIEWEE_FK LIKE '${reviewee_fk}'`;
                    connection.query(sql, (err, res) => {
                        connection.release();

                        if (err) {
                            console.log("sql error " + err);
                            reject(err);
                        }
                        resolve(res);
                    })
                }
                else {
                    console.log("mysql connection error " + err);
                    throw err;
                }
            })
        })
    },

    setComment: (commentData) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if (!err) {
                    let sql =  `INSERT INTO
                                    COMMENT_TB
                                VALUES
                                    ( ID_PK, ? )`;
                    connection.query(sql, [commentData], (err, res) => {
                        connection.release();

                        if (err) {
                            console.log("sql error " + err);
                            reject(err);
                        }
                        resolve(res);
                    })
                }
                else {
                    console.log("mysql connection error " + err);
                    throw err;
                }
            })
        })
    },

    getComment: (reviewer_fk) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if (!err) {
                    let sql =  `SELECT
                                    COMMENT,
                                    DATE,
                                    REVIEWEE_FK
                                FROM
                                    COMMENT_TB
                                WHERE
                                    REVIEWER_FK LIKE '${reviewer_fk}'`;
                    connection.query(sql, (err, res) => {
                        connection.release();

                        if (err) {
                            console.log("sql error " + err);
                            reject(err);
                        }
                        resolve(res);
                    })
                }
                else {
                    console.log("mysql connection error " + err);
                    throw err;
                }
            })
        })
    },
}

module.exports = guestBook;