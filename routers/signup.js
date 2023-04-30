const express = require('express');
const router = express.Router();
const user = require('../models/user');
const bcrypt = require('bcrypt');
const setProfileImage = require('../others/setProfileImage');
const smtpTransport = require('../config/email');

//회원가입
//이메일 인증은 어떻게 구현하지?
//일단 나중에 고려하자

// http://localhost:8080/signup
router.get('/', async (req, res) => {
    res.render('signup/signup');
})

//test admin 생성용
// {
//     "id" : "admin",
//     "pwd" : "1234",
//     "profileImgNumber" : "0",
//     "nickname" : "admin",
//     "email" : "test@test.ac.kr",
//     "github" : "http://localhost:8080/test",
//     "is_admin" : 1,
//     "authentication" : 1,
//     "c" : 0,
//     "cPlus" : 0,
//     "cSharp" : 0,
//     "java" : 0,
//     "kotlin" : 0,
//     "swift" : 0,
//     "python" : 0,
//     "go" : 0,
//     "javascript" : 0,
//     "rust" : 0,
//     "ruby" :0,
//     "codereview" : 0,
//     "refactoring" : 0,
//     "qa" : 0
// }

// http://localhost:8080/signup
router.post('/', async (req, res) => {
    console.log(req.body);
    let userInfo = {
        id : req.body.id,
        encryptPwd : await bcrypt.hash(req.body.pwd, 12),
        profileImg : setProfileImage(req.body.profileImgNumber),
        nickname : req.body.nickname,
        email : req.body.email,
        github : req.body.github,
        is_admin : 0,
        authentication : 0
    }

    let languageInfo = {
        id : req.body.id,
        c : req.body.c,
        cPlus : req.body.cPlus,
        cSharp : req.body.cSharp,
        java : req.body.java,
        kotlin : req.body.kotlin,
        swift : req.body.swift,
        python : req.body.python,
        go : req.body.go,
        javascript : req.body.javascript,
        rust : req.body.rust,
        ruby : req.body.ruby
    }

    let activityInfo = {
        id : req.body.id,
        codereview : req.body.codereview,
        refactoring : req.body.refactoring,
        qa : req.body.qa
    }

    //데이터 삽입이 안됐을 경우에는?
    await user.signUp.setUserInfo(userInfo, languageInfo, activityInfo);

    res.redirect('/login');
})

// 미구현
router.get('/email', (req, res) => {
    //페이지 렌더링
    res.render('email/email');
})

// 미구현
router.post('/email', async (req, res) => {

    let generateRandom = function (min, max) {
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }

    const auth = {
        SendEmail: async (req, res) => {
            const number = generateRandom(111111, 999999)

            const sendEmail = req.body.sendEmail;

            const mailOptions = {
                //임시 이메일, 나중에 바꿔야함
                from: "test@gmail.com",
                to: sendEmail,
                subject: "[onecastle]Authentication code",
                text: "If you proceed one more step, your authentication will be completed. Please enter the following authentication code: " + number
            };

            await smtpTransport.sendMail(mailOptions, (err, res) => {
                try {
                    res.status(statusCode.OK).send(util.success(statusCode.OK, responseMsg.AUTH_EMAIL_SUCCESS, {
                        number: number
                    }))
                }
                catch(err)  {
                    res.status(statusCode.OK).send(util.fail(statusCode.BAD_REQUEST, responseMsg.AUTH_EMAIL_FAIL))
                }
            })
        }
    }
})

module.exports = router;