const UserPW = require("../models/userPW");
/*
exports.create = (req,res)=>{
  if(!req.body){
      res.status(400).send({
          message: "Content can not be empty!"
      });
  };

  const userpw = new UserPW({
      user_studentId: req.user_studentId,
      userPW: req.body.userPW
  });

  // 데이터베이스에 저장
  UserPW.create(userpw, (err, data) =>{
      if(err){
          res.status(500).send({
              message:
              err.message || "Some error occured while creating the User Password."
          });
      };
  })
};
*/
exports.update = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    
    UserPW.updateById(
      req.params.studentId,
      new UserPW(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.studentId}.`
            });
          } else {
              res.status(500).send({
              message: "Error updating User with id " + req.params.studentId
              });
          }
        } else res.send(data);
      }
    );
};