const express = require('express');
const bodyParser = require("body-parser");

const PROFILEROUTER = require('./routers/profile');
const SIGNUPROUTER = require("./routers/signup");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 8080);

//view engine 설정 이렇게 하는게 맞나..?
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
// app.get('/', (req, res) =>{
//     res.json({ test : "test"});
// });

app.use(bodyParser.json());

app.use('/profile', PROFILEROUTER);
app.use('/signup', SIGNUPROUTER);


app.listen(app.get('port'), () => {
    console.log(app.get('port'), "빈 포트에서 대기");
});