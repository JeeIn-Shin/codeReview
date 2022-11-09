const Interest = require("../models/interest.js");

exports.create = (req,res)=>{
  if(!req.body){
      res.status(400).send({
          message: "Content can not be empty!"
      });
  };

  const interest = new Interest({
    user_studentId: req.user_studentId,
    team: req.team,
    personal: req.personal
  });

  // 데이터베이스에 저장
  Interest.create(interest, (err, data) =>{
      if(err){
          res.status(500).send({
              message:
              err.message || "Some error occured while creating the Language."
          });
      };
  })
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    
    Interest.updateById(
        req.params.user_studentId,
        new Interest(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found User with id ${req.params.user_studentId}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating User with id " + req.params.user_studentId
              });
            }
          } else res.send(data);
        }
      );
};