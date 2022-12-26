const Language = require("../model/Language");
const express = require("express");
const router = express.Router();


// {
//     "user_student_id": 2070000
// }

// http://localhost:8080/language/init


// 회원가입 시 자동으로 이뤄지는 부분임 지금 건들기 XXXXXX 최초 정보 설정
router.post('/init', async(req, res) => {

    //해당 ID가 DB에 있는지 체크
    let adminID = req.body.user_student_id;

    //가입시 자동 설정
    let init = {
        'C': 0,
        //C++
        'C-plus': 0,
        //C#
        'C-sharp': 0,
        'Java': 0,
        'Kotlin': 0,
        'Swift': 0,
        'Python': 0,
        'Go': 0,
        'JavaScript': 0,
        'Rust': 0,
        'Ruby': 0
    };

    await Language.initial(adminID, init, (err, data) => {
        try {
            res.json(data);
        }
        catch(err)  {
            console.error();
        }
    })
})


// {
//     "C": 2,
//     "C-plus": 2,
//     "C-sharp": 3,
//     "Java": 3,
//     "Kotlin": 2,
//     "Swift": 3,
//     "Python": 3,
//     "Go": 3,
//     "JavaScript": 1,
//     "Rust": 3,
//     "Ruby": 3
// }

// http://localhost:8080/language/set/:studentID
// 언어 변경 버튼 눌렀을 때 화면 전환이 이뤄지면서
// 전체적으로 한번 다 누르고 수정 버튼이 눌러질 때 이 부분이 호출됨
router.put('/set/:adminID', async(req, res) => {
    
    //1. 로그인 되어있는게 맞는지

    //2. 현재 로그인 된 아이디가 DB에 있는지 -- ?????????


    let setting_language = {
        "C": req.body.C,
        "Cplus": req.body.Cplus,
        "Csharp": req.body.Csharp,
        "Java": req.body.Java,
        "Kotlin": req.body.Kotlin,
        "Swift": req.body.Swift,
        "Python": req.body.Python,
        "Go": req.body.Go,
        "JavaScript": req.body.JavaScript,
        "Rust": req.body.Rust,
        "Ruby": req.body.Ruby
    }

    await Language.set(req.params.adminID, setting_language, (err, data) => {
        try {
            res.json(data);
        }
        catch(err) {
            console.error();
        }
    })
})

// http://localhost:8080/language/:studentID
// 개인정보 설정 페이지로 이동했을 경우
// 이 부분을 호출함으로써 로그인한 사람의 프로그래밍 언어 선호도가 보여짐
router.get('/:studentID', async(req, res) => {
    
    //로그인 확인
    let adminID = req.params.studentID;
    
    await Language.getbyID(adminID, (err, data) =>{
        try {
            res.json(data);
        }
        catch(err) {
            console.error();
        }
    })
})


module.exports = router;