const Language = require("../model/Language");

module.exports = app => {

    //app.post("/user/setting", Language.create);
    app.get("/user/setting", Language.getLanguage_specific_user);

}