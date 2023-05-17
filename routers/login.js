const express = require('express');
const router = express.Router();
const passport = require('passport');

const jwt = require('jsonwebtoken');
const client = require('../models/user');

// http://localhost:8080/login
router.route('/')
.get((req, res) => {
    res.render('login/login');
})
.post(async(req, res, next) => {
    const REFRESHTOKEN = jwt.sign({},
        process.env.secret, {
            expiresIn: '14d',
            issuer: 'cotak'
        });
    
    try {
        const PK = await client.signIn.getUserPK(req.body.id);
        let newToken = await client.signIn.setRefreshToken(PK, REFRESHTOKEN); 
        let userInfo = await client.signIn.getUserById(req.body.id);
        
        let id = userInfo.ID;
        let nickname = userInfo.NICKNAME;
        let isAdmin = userInfo.IS_ADMIN;
        
        let accessToken = jwt.sign({ id, nickname, isAdmin }, 
            process.env.secret, {
                expiresIn: '1h',
                issuer: 'cotak'
            });
        
        res.cookie('accessToken', accessToken);
        res.cookie('refreshToken', REFRESHTOKEN);
        
        res.json(accessToken);
        //성공적으로 저장이 잘 됐다면 메인페이지로 하지만 아직 미정
        //res.redirect('/');
    }
    catch(err)  {
        next(err);
    }
});

module.exports = router;
