const Interest = require("../model/interest");

module.exports = app => {

    //app.post("/user/setting", Interest.create);
    app.get("/user/setting", Interest.getInterest_specific_user);

}