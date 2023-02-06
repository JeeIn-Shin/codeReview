const DB = require('../config/database');

const CHAT = {
    setChatUser : (data) => {

        let userInfo = data;

        DB.getConnection((err, connection) => {
            if(!err)    {
                let sql = `INSERT INTO CHAT_USER_TB VALUES (?)`;

                connection.query(sql, userInfo, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error" + err);
                        return err;
                    }
                    else
                        return res;
                })
            }
            else
                console.log("connection error" + err);
        })
    },

    getChatUser : (roomId) => {
        DB.getConnection((err, connection) => {
            if(!err)    {

                let sql = `SELECT USER_ID FROM CHAT_USER_TB WHERE ROOM_ID = ${roomId}`;

                connection.query(sql, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error" + err);
                        return err;
                    }
                    else
                        return res;
                })
            }
            else
                console.log("connection error" + err);
        })
    },

    setChatRoomInfo : () => {
        DB.getConnection((err, connection) => {
            if(!err)    {
                let sql = ``;

                connection.query(sql, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error" + err);
                        return err;
                    }
                    else
                        return res;
                })
            }
            else
                console.log("connection error" + err);
        })
    },

    getChatRoomInfo : () => {
        DB.getConnection((err, connection) => {
            if(!err)    {
                let sql = ``;

                connection.query(sql, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error" + err);
                        return err;
                    }
                    else
                        return res;
                })
            }
            else
                console.log("connection error" + err);
        })
    },

    deleteChatRoomInfo : () => {
        DB.getConnection((err, connection) => {
            if(!err)    {
                
                let sql = `DELETE FROM `;

                connection.query(sql, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error" + err);
                        return err;
                    }
                    else
                        return res;
                })
            }
            else
                console.log("connection error" + err);
        })
    },

    //어떤 방에서, 누가, 어떤 메세지를 보냈는지
    setChatMessage : () => {
        DB.getConnection((err, connection) => {
            if(!err)    {
                let sql = ``;

                connection.query(sql, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error" + err);
                        return err;
                    }
                    else
                        return res;
                })
            }
            else
                console.log("connection error" + err);
        })
    },

    getChatMessage : () => {
        DB.getConnection((err, connection) => {
            if(!err)    {
                let sql = ``;

                connection.query(sql, (err, res) => {
                    connection.release();

                    if(err) {
                        console.log("sql error" + err);
                        return err;
                    }
                    else
                        return res;
                })
            }
            else
                console.log("connection error" + err);
        })
    },
}

module.exports = CHAT;