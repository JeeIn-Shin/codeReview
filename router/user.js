const user = require("../model/user");

app.post("/user", user.create);