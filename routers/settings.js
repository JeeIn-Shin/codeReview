const express = require('express');
const router = express.Router();
const settings = require('../models/settings');
const { isLoggedIn } = require('./middleware');
require('express-session');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// 논의된 바 없는 페이지
// http://localhost:8080/settings
router.get('/', isLoggedIn, async(req, res) => {
    res.render('settings/main');
})

// http://localhost:8080/settings/profile
router.get('/', isLoggedIn, async(req, res) => {
    let userId = Object.assign({} , req.session.passport);
    let result = await settings.getByLoginInfo(userId);

    res.render('settings/profile', { userInfo : result });
})

//로그인 된게 맞는지
// http://localhost:8080/settings/profile
router.post('/profile', async(req, res) => {
    let userId = Object.assign({} , req.session.passport);
    let updateInfo = {
        profileImg: req.body.profileImg,
        nickName : req.body.nickName,   
        github : req.body.GITHUB,        
    }

    await settings.updateInfo(userId, updateInfo);
    res.redirect('/settings/profile');
})

// http://localhost:8080/settings/language
router.get('/language', isLoggedIn, async(req, res) => {
    let userId = Object.assign({} , req.session.passport);
    let result = await settings.getUserLanguage(userId);

    res.render('settings/language', { userLanguage : result });
})

// http://localhost:8080/settings/language
router.post('/language', async(req, res) => {
    
    let userId = Object.assign({} , req.session.passport);

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
    
    await settings.updateLanguage(userId, updateLanguageData);

    res.redirect('/settings/language');
})

// http://localhost:8080/settings/activity
router.get('/activity', isLoggedIn, async(req, res) => {
    let userId = Object.assign({} , req.session.passport);
    let result = await settings.getUserActivity(userId);

    res.render('settings/activity', { userActivity : result });
})

// http://localhost:8080/settings/activity
router.post('/activity', async(req, res) => {
    let userId = Object.assign({} , req.session.passport);
    let updateInfo = {
        codeReview : req.body.codeReview, 
        refactoring : req.body.refactoring, 
        qa : req.body.qa,   
    }
    
    await settings.updateActivity(userId, updateInfo);

    res.redirect('/settings/activity');
})

module.exports = router;
