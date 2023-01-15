const express = require('express');
const bodyParser = require("body-parser");

const PROFILEROUTER = require('./router/profile');
const SIGNUPROUTER = require("./router/signup");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 8080);

app.get('/', (req, res) =>{
    res.json({ test : "test"});
});

app.use(bodyParser.json());

app.use('/profile', PROFILEROUTER);
app.use('/signup', SIGNUPROUTER);


app.listen(app.get('port'), () => {
    console.log(app.get('port'), "빈 포트에서 대기");
});