const User = require('../model/profile');
const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

//프로필 화면에서 사용자의 가입 시 기본 프로필을 보여줌
// http://localhost:8080/user/profile/:studentID
router.get('/profile/:studentID', async(req, res) => {

    //로그인 된게 맞는지

    //아니라면 ..

    await User.findById(req.params.studentID, (err, data) => {
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
    //이미지 파일 0~6외의 숫자가 들어간건 아닌지

    let update_value = {
        "profile_img": req.body.img,
        "nickname": req.body.nickname,
        "email": req.body.email,   
        "git_hub": req.body.git_hub,        
    }
    
    await User.update(req.params.studentID, update_value, (err, data) => {
        try {
            res.json(data);
        }
        catch(err) {
            console.error(err);
        }
    })
})

module.exports = router;
