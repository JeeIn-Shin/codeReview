const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const client = require('../models/user');

// http://localhost:8080/login
router.route('/')
.get((req, res) => {
    res.render('login/login');
})
.post(async(req, res, next) => {
    const refreshToken = jwt.sign({},
        process.env.secret, {
            expiresIn: '14d',
            issuer: 'cotak'
        });
    
    try {
        const pk = await client.signIn.getUserPKById(req.body.id);
        let userInfo = await client.signIn.getUserById(req.body.id);

        let id = userInfo.ID;
        let nickname = userInfo.NICKNAME;
        let isAdmin = userInfo.IS_ADMIN;
        
        let accessToken = jwt.sign({ id, nickname, isAdmin }, 
            process.env.secret, {
                expiresIn: '1h',
                issuer: 'cotak',
            });

        let tokens = {
            refreshToken,
            accessToken
        }
        await client.signIn.setTokens(pk.ID_PK, tokens); 

        res.cookie('accessToken', accessToken, { httpOnly : true });
        res.json(accessToken);
    }
    catch(err)  {
        next(err);
    }
});

module.exports = router;
