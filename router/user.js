const user = require("../model/user");

module.exports = app => {

    app.post("/user", user.create);
    app.get("/user", user.getAll);

}