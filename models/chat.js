const { reject } = require('bluebird');
const { resolve } = require('path');
const db = require('../config/database');

const chat = {

    //로그인한 사람이 참여하고 있는 채팅방 리스트를 다 불러옴
    getChatRoomsList : (id, result) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(!err)    {
                    let sql = `SELECT CHAT_ROOM_TB_ID_PK
                               FROM CHAT_USER_TB
                               WHERE ID_PK LIKE ${id}`;
    
                    connection.query(sql, userInfo, (err, data) => {
                        connection.release();
    
                        if(err) {
                            console.log("sql error" + err);
                            return result(null, err);
                        }
                        else
                            return result(null, data);
                    })
                }
                else
                    console.log("connection error" + err);
            })
        })
    },

    seneMessagetoSpecificChatRoom : (id, result) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(!err)    {
                    let sql = `INSERT INTO CHAT_MESSAGE_TB ( ID_PK, ? )`;
    
                    connection.query(sql, userInfo, (err, data) => {
                        connection.release();
    
                        if(err) {
                            console.log("sql error" + err);
                            reject(err);
                        }
                        else
                            resolve(data);
                    })
                }
                else
                    console.log("connection error" + err);
            })
        })
    },

    getSpecificChatRoomMessage : (roomId) => {
        return new Promise((resolve, reject) => {
            db.getConnection((err, connection) => {
                if(!err)    {
                    let sql = `SELECT CHAT_USER_ID, MESSAGE, DATE, TIME
                               FROM CHAT_USER_TB
                               WHERE CHAT_ROOM_ID LIKE ${roomId}
                               ORDER BY DATE ASC
                               AND TIME ASC`;
    
                    connection.query(sql, userInfo, (err, data) => {
                        connection.release();
    
                        if(err) {
                            console.log("sql error" + err);
                            reject(err);
                        }
                        else
                            resolve(data);
                    })
                }
                else    {
                    console.log("connection error" + err);
                    return err;
                }
    
            })
        })
    },
}

module.exports = chat;