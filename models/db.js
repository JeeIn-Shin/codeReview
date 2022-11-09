const mysql = require('mysql');

const dbInfo = mysql.createConnection({
    host: process.env.host,
    port: '3306',
    user: process.env.user,
    password: process.env.password,
    datebase: 'codeReview'
});

dbInfo.connect(error=>{
    if(error) throw error;
    console.log("Successfully connected to the database. ");
})