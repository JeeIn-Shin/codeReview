const express = require('express');
const dotenv = require('dotenv').config()
const DBconfig = require(__dirname + '/config/database.js');
const connect = DBconfig.init();

DBconfig.connect(connect);

const app = express();

app.set('port', process.env.PORT || 8080);

app.get('/', (req, res) =>{
    res.send("test");
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), "빈 포트에서 대기");
});