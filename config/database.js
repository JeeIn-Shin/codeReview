const mysql = require('mysql');

const dbInfo = {
    host: process.env.host,
    port: '3306',
    user: process.env.user,
    password: process.env.password,
    datebase: 'codeReview'
};

module.exports = {
    init: function () {
        return mysql.createConnection(dbInfo);
    },
    connect: function(connect)  {
        connect.connect(function(err) {
            if(err)
                console.error('mysql connection error' + err);
            else
                console.log('mysql connection success');
        })
    }
};