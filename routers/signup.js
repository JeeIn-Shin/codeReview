const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const USER = require('../models/user');
const path = require('path');
const bcrypt = require('bcrypt');
const setProfileImage = require('../others/setProfileImage');
const smtpTransport = require('../config/email');
//회원가입
//이메일 인증은 어떻게 구현하지?
//일단 나중에 고려하자

// 얠 어떻게 하지?;;;;;;;;;;;;
ROUTER.get('/', async (req, res) => {
    res.render('signup/signup.html');
})

// http://localhost:8080/signup
ROUTER.post('/', async (req, res) => {


    let id = req.body.id
    let password = req.body.password
    let profileImgNumber = req.body.profileImgNumber
    let nickname = req.body.nickname
    let email = req.body.email
    let github = req.body.github

    let encryptPwd = await bcrypt.hash(password, 12);
    let profileImg = setProfileImage(profileImgNumber);

    let userInfo = {
        id,
        encryptPwd,
        profileImg,
        nickname,
        email,
        github
    }

    await USER.signUp.setPersonalInformation(userInfo, (err, data) => {
        try {
            res.json(data);
        }
        catch (err) {
            //어떤 에러가 발생할 수 있지?
            //등록된 이메일 주소라던가, 등록된 깃허브 주소라던가,
            //등록된 깃허브 주소라는건 어떻게 알 수 있지? UQ로는 알 수 없음 => NULL 에서 문제가 생김
            //비밀번호 유효성 체크
            //학번도 근데 학번 으음; 고민되네..
        }
    })
})

ROUTER.get('/email', (req, res) => {
    //페이지 렌더링
    res.render('');
})

ROUTER.post('/email', async (req, res) => {

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

module.exports = ROUTER;