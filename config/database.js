const mysql = require('mysql');
require('dotenv').config();

const dbInfo = {
    host: process.env.host,
    port: '3306',
    user: process.env.user,
    password: process.env.password,
    database: 'codereview'
};

let db = {
	init:function() {
		return mysql.createConnection(dbInfo);
	},
	connection:function(con) {
		con.connect(function(err){
			if(err) {
				console.log("mysql connection error :"+err);
				setTimeout(init, 2000);

			} else {
				console.log("mysql connection sucessfully");
			}
		})
	}
}

module.exports = db;