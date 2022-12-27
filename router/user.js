const User = require('../model/user');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//프로필 화면에서 사용자의 가입 시 기본 프로필을 보여줌
// http://localhost:8080/user/profile/:studentID
router.get('/profile/:studentID', async(req, res) => {

    //로그인 된게 맞는지

    //아니라면 ..

    await User.findById(req.params, (err, data) => {
        try {
            res.json(data);
        }
        catch(err)  {
            console.error(err);
        }
    })
})


// http://localhost:8080/user/profile/update/:studentID
router.put('/profile/update/:studentID', async(req, res) => {
    
    //로그인 된게 맞는지

    //이메일, 닉네임, 깃허브 중복없는지


    let update_value = {
        email: req.body.email,
        nickname: req.body.email,
        git_hub: req.body.git_hub
    }
    
    
    await User.update(req.params, update_value, (err, data) => {
        try {
            res.json(data);
        }
        catch(err) {
            console.error(err);
        }
    })
})

module.exports = router;
