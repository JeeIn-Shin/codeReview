const express = require('express');
const router = express.Router();
const settings = require('../models/settings');
const client = require('../models/user');
const { checkTokens } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// 논의된 바 없는 페이지
// http://localhost:8080/settings
router.get('/', checkTokens, async(req, res) => {
    res.render('settings/main');
})

// http://localhost:8080/settings/profile
router.get('/profile', checkTokens, async(req, res) => {
    let user = jwt.decode(req.cookies.accessToken, process.env.secret);
    let result = await settings.getByLoginInfo(user.id);

    //res.json(result[0]);
    res.render('settings/profile', { userInfo : result });
})

//로그인 된게 맞는지
// http://localhost:8080/settings/profile
router.post('/profile', checkTokens, async(req, res) => {
    let user = jwt.decode(req.cookies.accessToken, process.env.secret);
    let updateInfo = {
        profileImg: req.body.profileImg,
        nickName : req.body.nickName,   
        github : req.body.github,
    }

    await settings.updateInfo(user.id, updateInfo);
    res.redirect('/settings/profile');
})

// http://localhost:8080/settings/language
router.get('/language', checkTokens, async(req, res) => {
    let user = jwt.decode(req.cookies.accessToken, process.env.secret);
    let result = await settings.getUserLanguage(user.id);

    //res.json(result[0]);
    res.render('settings/language', { userLanguageInfo : result });
})

// http://localhost:8080/settings/language
router.post('/language', checkTokens, async(req, res) => {
    
    let user = jwt.decode(req.cookies.accessToken, process.env.secret);

    let updateLanguageData = {
        C : req.body.C, 
        CPlus : req.body.CPlus, 
        CSharp : req.body.CSharp, 
        java : req.body.java, 
        kotlin : req.body.kotlin, 
        swift : req.body.swift, 
        python : req.body.python, 
        go : req.body.go,
        javascript : req.body.javascript,
        rust : req.body.rust,
        ruby : req.body.ruby       
    }
    
    await settings.updateLanguage(user.id, updateLanguageData);

    res.redirect('/settings/language');
})

// http://localhost:8080/settings/activity
router.get('/activity', checkTokens, async(req, res) => {
    let user = jwt.decode(req.cookies.accessToken, process.env.secret);
    let result = await settings.getUserActivity(user.id);

    //res.json(result[0]);
    res.render('settings/activity', { userActivity : result[0] });
})

// http://localhost:8080/settings/activity
router.post('/activity', checkTokens, async(req, res) => {
    let user = jwt.decode(req.cookies.accessToken, process.env.secret);
    
    let updateInfo = {
        codeReview : req.body.codeReview, 
        refactoring : req.body.refactoring, 
        qa : req.body.qa,   
    }
    
    await settings.updateActivity(user.id, updateInfo);

    res.redirect('/settings/activity');
})

module.exports = router;
