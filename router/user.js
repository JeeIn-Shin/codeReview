const User = require('../model/user');
const express = require('express');
const router = express.Router();

//http://localhost:8080/user/create
router.post('/create', async(req, res) => {
    //Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    //Create a User
    //입력 받는건  id, password, name, email, nickname
    //position 은 기본값 0으로 설정
    //position은 추후 수정될 가능성 농후
    //positon X , column이 reviewee, reviewer로 쪼개진다던가..
    const user = new User({
        student_id: req.body.student_id,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        nickname: req.body.nickname,
        positon: 0    // default(0), reviewee(1), reviewer(2)
    });

    //let input_user_data = await User.create(user)

    // Save User in the database
    User.create(input_user_data, (err, data) => {
        
        //문제 발생, 값이 입력받아지지않음
        //어째서..!
        console.log(input_user_data.student_id);
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.json(data);
    });
})


router.get('/:student_id', (req, res) => {
    User.findById(req.params.student_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found student with id ${req.params.student_id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving student with id " + req.params.student_id
                });
            }
        } else res.json(data);
    });
});

module.exports = router;
