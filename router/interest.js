const Interest = require("../model/interest");
const express = require("express");
const router = express.Router();


// http://localhost:8080/interest/init
// 회원가입 시 자동으로 이뤄지는 부분임 지금 건들기 XXXXXX 최초 정보 설정
router.post('/init', async(req, res) => {

    //해당 ID가 DB에 있는지 체크
    let adminID = req.body.user_student_id;

    //가입시 자동 설정
    let init = {
        "code_review": 0,
        "refactoring": 0,
        "QA": 0,
        "implementation": 0,
        "design": 0
    };

    await Interest.initial(adminID, init, (err, data) => {
        try {
            res.json(data);
        }
        catch(err)  {
            console.error();
        }
    })
})


// http://localhost:8080/interest/set/:studentID
// 관심활동 변경 버튼 눌렀을 때 화면 전환이 이뤄지면서
// 전체적으로 한번 다 누르고 수정 버튼이 눌러질 때 이 부분이 호출됨
router.put('/set/:adminID', async(req, res) => {
    
    //1. 로그인 되어있는게 맞는지

    //2. 현재 로그인 된 아이디가 DB에 있는지 -- ?????????


    let setting_language = {
        "code_review": req.body.code_review,
        "refactoring": req.body.refactoring,
        "QA": req.body.QA,
        "implementation": req.body.implementation,
        "design": req.body.design
    }

    await Interest.set(req.params.adminID, setting_language, (err, data) => {
        try {
            res.json(data);
        }
        catch(err) {
            console.error();
        }
    })
})

// http://localhost:8080/interest/:studentID
// 개인정보 설정 페이지로 이동했을 경우
// 이 부분을 호출함으로써 로그인한 사람의 프로그래밍 언어 선호도가 보여짐
router.get('/:studentID', async(req, res) => {
    
    //로그인 확인
    let adminID = req.params.studentID;
    
    await Interest.getbyID(adminID, (err, data) =>{
        try {
            res.json(data);
        }
        catch(err) {
            console.error();
        }
    })
})

module.exports = router;