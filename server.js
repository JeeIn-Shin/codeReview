const express = require('express');
const session = require('express-session');
const bodyParser = require("body-parser");
const path = require('path');
const passport = require('passport');
const passportConfig = require('./passport/index');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret : process.env.secret,
    resave : false,
    saveUninitialized : false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser(process.env.secret));

passportConfig();

app.use(methodOverride('_method'));

const PROFILEROUTER = require('./routers/profile');
const SIGNUPROUTER = require("./routers/signup");
const MATCHINGROUTER = require("./routers/matching");
const CHATROUTER = require("./routers/chat");
const NOTICEROUTER = require('./routers/noticeBoard');
const LOGINROUTER = require('./routers/login');

app.set('port', process.env.PORT || 8080);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','html');
app.engine('html', require('ejs').__express);


app.use('/profile', PROFILEROUTER);
app.use('/signup', SIGNUPROUTER);
app.use('/walk-thru', MATCHINGROUTER);
app.use('/direct', CHATROUTER);
app.use('/notice', NOTICEROUTER)
app.use('/login', LOGINROUTER)

app.listen(app.get('port'), () => {
    console.log(app.get('port'), "빈 포트에서 대기");
});