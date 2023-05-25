const express = require('express');
const router = express.Router();
const settings = require('../models/settings');
const { checkTokens } = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// http://localhost:8080/settings/profile
router.get('/profile', checkTokens, async(req, res) => {
    console.log(req.header);
    let AT =  req.headers.Authorization.split('Bearer ')[1];
    let user = jwt.decode(AT, process.env.secret);

    let result = await settings.getByLoginInfo(user.id);

    res.render('settings/profile', { userInfo : result });
})

// http://localhost:8080/settings/profile
router.post('/profile', checkTokens, async(req, res) => {

    let AT =  req.headers.Authorization.split('Bearer ')[1];
    let user = jwt.decode(AT, process.env.secret);
    
    let updateInfo = {
        profileImg: req.body.profileImg,
        nickName : req.body.nickName,   
        github : req.body.github,
    }

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

    let updateActivityData = {
        codeReview : req.body.codeReview, 
        refactoring : req.body.refactoring, 
        qa : req.body.qa,   
    }

    await settings.updateUserInfo(user.id, updateInfo, updateLanguageData, updateActivityData);
    res.redirect('/settings/profile');
})

module.exports = router;
