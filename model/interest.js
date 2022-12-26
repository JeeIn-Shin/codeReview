const sql = require("../config/database.js");

const Interest = function (Interest_setting) {
    this.studentID = Interest_setting.studentID;
    this.codeReview = Interest_setting.codeReview;
    this.refactoring = Interest_setting.refactoring;
    this.QA = Interest_setting.QA;
    this.implementation = Interest_setting.implementation;
    this.design = Interest_setting.design;
};

//회원가입시 기본설정으로 자동기입됨


module.exports = Interest;