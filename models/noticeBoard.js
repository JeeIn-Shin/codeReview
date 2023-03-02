const db = require('../config/database');

const noticeBoard = {
    getAll : (result) => {
        db.getConnection((err, connection) => {
            if(!err) {
                let sql = `SELECT ID_PK, TITLE, DETAILS, DATE, WRITER FROM NOTICEBOARD_TB`;
                connection.query(sql, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("query err" + err);
                        return result(err, null);
                    }
                    else
                        return result(null, res);
                })
            }
            else    {
                console.log(err);
                throw err;
            }
        })
    },

    getbyIdx : (idx, result) => {
        db.getConnection((err, connection) => {
            if(!err) {
                let sql = `SELECT ID_PK, TITLE, DETAILS, DATE, WRITER FROM NOTICEBOARD_TB
                           WHERE ID_PK LIKE ${idx}`;
                connection.query(sql, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("query err" + err);
                        return result(err, null);
                    }
                    else
                        return result(null, res);
                })
            }
            else    {
                console.log(err);
                throw err;
            }
        })
    },

    postNotice : (rawdata, result) => {
        let inputData = Object.values(rawdata);

        db.getConnection((err, connection) => {
            if(!err) {
                let sql = `INSERT INTO NOTICEBOARD_TB ( ID_PK, ? )`;
                connection.query(sql, [inputData], (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("query err" + err);
                        return result(err, null);
                    }
                    else
                        return result(null, res);
                })
            }
            else    {
                console.log(err);
                throw err;
            }
        })
    },

    modifybyIdx : (idx, rawdata, result) => {
        let updateData = Object.values(rawdata);
        
        db.getConnection((err, connection) => {
            if(!err) {
                let sql = `UPDATE NOTICEBOARD_TB SET TITLE = ?, DETAILS = ?, DATE = ?, WRITER = ?
                           WHERE ID_PK LIKE ${idx}`;
                connection.query(sql, updateData, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("query err" + err);
                        return result(err, null);
                    }
                    else
                        return result(null, res);
                })
            }
            else    {
                console.log(err);
                throw err;
            }
        })
    },

    deleteByIdx : (idx, result) => {
        db.getConnection((err, connection) => {
            if(!err) {
                let sql = `DELETE FROM NOTICEBOARD_TB
                           WHERE ID_PK LIKE ${idx}`;
                connection.query(sql, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("query err" + err);
                        return result(err, null);
                    }
                    else
                        return result(null, res);
                })
            }
            else    {
                console.log(err);
                throw err;
            }
        })
    }
}

module.exports = noticeBoard;