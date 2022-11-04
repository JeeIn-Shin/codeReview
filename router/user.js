const User = require("../model/user");

module.exports = app => {

    app.post("/user", User.create);
    app.get("/user", User.get_specific_user);

}