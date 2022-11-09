const express = require("express");
require('dotenv').config();
//const bodyParser = require("body-parser");

//const DBconfig = require(__dirname + '/config/db.js');
//const connect = DBconfig.init();

//DBconfig.connect(connect);

const app = express();

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 8080);

app.get("/", (req, res)=>{
    res.json({message: "CodeReview"});
});

require("./routes/routes.js")(app)


// 포트넘버 설정
app.listen(3000, ()=>{
    console.log("Server is running on port 3000.");
})