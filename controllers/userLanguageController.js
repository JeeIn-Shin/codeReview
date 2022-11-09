const Language = require("../models/language.js");

exports.create = (req,res)=>{
  if(!req.body){
      res.status(400).send({
          message: "Content can not be empty!"
      });
  };

  const language = new Language({
      user_studentId: req.user_studentId,
      advanced1: req.advanced1,
      advanced2: req.advanced2,
      advanced3: req.advanced3,
      novice1: req.novice1,
      novice2: req.novice2,
      novice3: req.novice3,
      intermediate1: req.intermediate1,
      intermediate2: req.intermediate2
  });

  // 데이터베이스에 저장
  Language.create(language, (err, data) =>{
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
    
    Language.updateById(
        req.params.user_studentId,
        new Language(req.body),
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