const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PROFILE = require('../models/profile');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

//프로필 화면에서 사용자의 가입 시 기본 프로필을 보여줌
// http://localhost:8080/profile/info
ROUTER.get('/info', async(req, res) => {

    //로그인 된게 맞는지
    let testId = 2071111;
    //아니라면 ..
    //

    await PROFILE.getByLoginInfo(testId, (err, data) => {
        try {
            res.json(data);
        }
        catch(err)  {
            console.error(err);
        }
    })
})

// http://localhost:8080/profile/info
ROUTER.put('/info', async(req, res) => {
    
    //로그인 된게 맞는지
    let testId = 2071111;

    let updateInfo = {
        "PROFILE_IMG": req.body.PROFILE_IMG,
        "NICKNAME": req.body.NICKNAME,   
        "GITHUB": req.body.GITHUB,        
    }
    
    await User.update(testId, updateInfo, (err, data) => {
        try {
            res.json(data);
        }
        catch(err) {
            console.error(err);
        }
    })
})

// http://localhost:8080/profile/language
ROUTER.get('/language', async(req, res) => {

    //로그인 된게 맞는지
    let testId = 2071111;
    //아니라면 ..
    //

    await PROFILE.getUserLanguage(testId, (err, data) => {
        try {
            res.json(data);
        }
        catch(err)  {
            console.error(err);
        }
    })
})

// http://localhost:8080/profile/language
ROUTER.put('/language', async(req, res) => {
    
    //로그인 된게 맞는지
    let testId = 2071111;

    let updateInfo = {
        "C" : req.body.C, 
        "CPLUS" : req.body.CPLUS, 
        "CSHARP" : req.body.CSHARP, 
        "JAVA" : req.body.JAVA, 
        "KOTLIN" : req.body.KOTLIN, 
        "SWIFT" : req.body.SWIFT, 
        "PYTHON" : req.body.PYTHON, 
        "GO" : req.body.GO,
        "JAVASCRIPT" : req.body.JAVASCRIPT,
        "RUST" : req.body.RUST,
        "RUBY" : req.body.RUBY       
    }
    
    await User.update(testId, updateInfo, (err, data) => {
        try {
            res.json(data);
        }
        catch(err) {
            console.error(err);
        }
    })
})

// http://localhost:8080/profile/activity
ROUTER.get('/activity', async(req, res) => {

    //로그인 된게 맞는지
    let testId = 2071111;
    //아니라면 ..
    //

    await PROFILE.getUserActivity(testId, (err, data) => {
        try {
            res.json(data);
        }
        catch(err)  {
            console.error(err);
        }
    })
})

// http://localhost:8080/profile/activity
ROUTER.put('/activity', async(req, res) => {
    
    //로그인 된게 맞는지
    let testId = 2071111;

    let updateInfo = {
        "CODEREVIEW" : req.body.CODEREVIEW, 
        "REFACTORING" : req.body.REFACTORING, 
        "QA" : req.body.QA,   
    }
    
    await User.update(testId, updateInfo, (err, data) => {
        try {
            res.json(data);
        }
        catch(err) {
            console.error(err);
        }
    })
})

module.exports = ROUTER;
