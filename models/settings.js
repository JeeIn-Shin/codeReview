const db = require("../config/database.js");
const setProfileImage = require("../others/setProfileImage");

const settings = {
  getByLoginInfo: (userInfo, languageInfo, activityInfo) => {
    return new Promise((resolve, reject) => {
      let user = Object.values(userInfo);
      let language = Object.values(languageInfo);
      let activity = Object.values(activityInfo);

      db.getConnection((err, connection) => {
        connection.beginTransaction((err) => {
          if (!err) {
            let sql1 = `SELECT
                                        GITHUB,
                                        NICKNAME,
                                        PROFILE_IMG
                                    FROM
                                        USER_TB 
                                    WHERE
                                        ID like '${id}'`;
            let sql2 = `SELECT
                                        C,
                                        CPLUS,
                                        CSHARP,
                                        JAVA,
                                        KOTLIN,
                                        SWIFT,
                                        PYTHON,
                                        GO,
                                        JAVASCRIPT,
                                        RUST,
                                        RUBY
                                    FROM
                                        LANGUAGE_TB
                                    WHERE
                                        id LIKE '${id}'`;
            let sql3 = `SELECT
                                        CODEREVIEW,
                                        REFACTORING,
                                        QA
                                    FROM
                                        ACTIVITY_TB
                                    WHERE
                                        id LIKE '${id}'`;

            connection.query(sql1, (err, res) => {
              if (err)
                return connection.rollback(() => {
                  throw err;
                });

              connection.query(sql2, (err, res) => {
                if (err)
                  return connection.rollback(() => {
                    throw err;
                  });

                connection.query(sql3, (err, res) => {
                  if (err)
                    return connection.rollback(() => {
                      throw err;
                    });

                  connection.commit((err) => {
                    if (err)
                      return connection.rollback(() => {
                        throw err;
                      });
                  });
                  resolve(res);
                });
              });
            });
          } else {
            console.log("connection error" + err);
            throw err;
          }
        });
      });
    });
  },

  updateUserInfo: (userInfo, languageInfo, activityInfo) => {
    return new Promise((resolve, reject) => {
      let user = Object.values(userInfo);
      let language = Object.values(languageInfo);
      let activity = Object.values(activityInfo);

      db.getConnection((err, connection) => {
        connection.beginTransaction((err) => {
          if (!err) {
            let sql1 = `UPDATE USER_TB SET
                                    PROFILE_IMG = ?, NICKNAME = ?, GITHUB = ?
                                    WHERE ID LIKE '${id}'`;
            let sql2 = `UPDATE LANGUAGE_TB SET
                                    C = ?, CPLUS = ?, CSHARP = ?, JAVA = ?, 
                                    KOTLIN = ?, SWIFT = ?, PYTHON = ?, GO = ? 
                                    JAVASCRIPT = ?, RUST = ?, RUBY = ?
                                    WHERE id LIKE '${id}'`;
            let sql3 = `UPDATE LANGUAGE_TB SET
                                    CODEREVIEW = ?, REFACTORING = ?, QA = ?
                                    WHERE id LIKE '${id}'`;

            connection.query(sql1, user, (err, res) => {
              if (err)
                return connection.rollback(() => {
                  throw err;
                });

              connection.query(sql2, language, (err, res) => {
                if (err)
                  return connection.rollback(() => {
                    throw err;
                  });

                connection.query(sql3, activity, (err, res) => {
                  if (err)
                    return connection.rollback(() => {
                      throw err;
                    });

                  connection.commit((err) => {
                    if (err)
                      return connection.rollback(() => {
                        throw err;
                      });
                  });
                  resolve(res);
                });
              });
            });
          } else {
            console.log("connection error" + err);
            throw err;
          }
        });
      });
    });
  },
};

module.exports = settings;
