const User = require('../model/user.js');

//Create user function
exports.create = (req, res) => {
    // Validate request
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
        student_id : req.body.student_id,
        password : req.body.password,
        name : req.body.name,
        email : req.body.email,
        nickname : req.body.nickname,
        positon : 0    // default(0), reviewee(1), reviewer(2)
    });
  
    // Save User in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
        });
        else res.send(data);
    });
  };