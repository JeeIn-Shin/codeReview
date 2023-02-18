const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

const PROFILEROUTER = require('./routers/profile');
const SIGNUPROUTER = require("./routers/signup");
const MATCHINGROUTER = require("./routers/matching");
const CHATROUTER = require("./routers/chat");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 8080);

//view engine 설정 이렇게 하는게 맞나..?
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.engine('html', require('ejs').__express);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/profile', PROFILEROUTER);
app.use('/signup', SIGNUPROUTER);
app.use('/walk-thru', MATCHINGROUTER);
app.use('/direct', CHATROUTER);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), "빈 포트에서 대기");
});