const express = require('express');
const bodyParser = require("body-parser");

const userRouter= require('./router/user');
const languageRouter = require("./router/language");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 8080);

app.get('/', (req, res) =>{
    res.json({ test : "test"});
});

app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/language', languageRouter);


app.listen(app.get('port'), () => {
    console.log(app.get('port'), "빈 포트에서 대기");
});