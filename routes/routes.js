module.exports = app =>{
    const userPW = require("../controllers/userPWController");
    const interest = require("../controllers/userInterstController");
    const language = require("../controllers/userLanguageController");

    /*
    app.put("/userPW", userPW.update);
    app.put("/userInterest", interest.update);
    app.put("/userLanguage", language.update);
    */
    //app.post("/userPW", userPW.create);
    app.put("/userPW/:studentId", userPW.update);
    app.put("/userInterest/:user_studentId", interest.update);
    app.put("/userLanguage/:user_studentId", language.update);
    
}