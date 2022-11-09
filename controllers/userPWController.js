const UserPW = require("../models/userPW");

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