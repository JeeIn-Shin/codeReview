const { resolve } = require('path');
const user = require('../models/user');

let getuserPK = ((id) => {
    return new Promise((resolve, reject) => {
        user.signIn.getUserPK(id, (err, res) => {
            if(!err) {
                return reject(res);
            }
            else
                resolve(err);
        })
    })
})

module.exports = getuserPK;