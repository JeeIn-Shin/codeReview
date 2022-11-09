const Language = require("../models/language.js");

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