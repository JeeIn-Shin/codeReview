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

// http://localhost:8080/signup
router.post('/', async (req, res) => {


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

    await user.signUp.setPersonalInformation(userInfo);
    res.redirect('/settings/language');
})

router.get('/email', (req, res) => {
    //페이지 렌더링
    res.render('');
})

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